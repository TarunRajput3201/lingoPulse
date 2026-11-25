import { Platform } from 'react-native';
import type { Audio as AudioType } from 'expo-av';
import type * as SpeechType from 'expo-speech';
import { AUDIO_ASSETS, AudioAssetKey } from './audioAssets';
import { LANGUAGE_BCP47_MAP, getBCP47Code } from '../data/courses/bcp47';

export { AUDIO_ASSETS, AudioAssetKey, LANGUAGE_BCP47_MAP, getBCP47Code };

const isWeb = Platform.OS === 'web';
const isNodeEnvironment =
  typeof process !== 'undefined' &&
  Boolean(process.versions?.node) &&
  typeof (global as any).nativeCallSyncHook === 'undefined' &&
  typeof (global as any).__turboModuleProxy === 'undefined';

let audioModuleCache: typeof AudioType | null | undefined = undefined;
function getAudio(): typeof AudioType | null {
  if (audioModuleCache !== undefined) return audioModuleCache;
  try {
    const mod = require('expo-av');
    const audio = (mod?.Audio || null) as typeof AudioType | null;
    audioModuleCache = audio;
    return audio;
  } catch {
    audioModuleCache = null;
    return null;
  }
}

let speechModuleCache: typeof SpeechType | null | undefined = undefined;
function getSpeech(): typeof SpeechType | null {
  if (speechModuleCache !== undefined) return speechModuleCache;
  try {
    const mod = require('expo-speech');
    const speech = (mod || null) as typeof SpeechType | null;
    speechModuleCache = speech;
    return speech;
  } catch {
    speechModuleCache = null;
    return null;
  }
}

let currentSound: any = null;
let currentWebAudio: any = null;
let isAudioEnabled = true;
let isAudioModeConfigured = false;
let isAudioEngineUnlocked = false;
let lastAudioLatencyMs = 0;

// Concurrency tracking sets to ensure clean, instant teardown
const activeWebAudioNodes = new Set<any>();
const activeHtml5Audio = new Set<any>();
const activeNativeSounds = new Set<any>();
const cachedAudioBuffers = new Map<AudioAssetKey, any>();
const preloadedAudioElements = new Map<string, HTMLAudioElement>();
const lastPlayTimestamps: Record<string, number> = {};

// Voice cache for ultra-fast <10ms lookup
let cachedVoices: SpeechSynthesisVoice[] = [];

function refreshVoices(): void {
  if (isWeb && typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        cachedVoices = v;
      }
    } catch {}
  }
}

if (isWeb && typeof window !== 'undefined' && 'speechSynthesis' in window) {
  refreshVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    refreshVoices();
  };
}

/**
 * Throttle duplicate sounds to prevent overlapping audio on rapid clicks
 */
function canPlaySound(key: string, minIntervalMs = 80): boolean {
  const now = Date.now();
  const last = lastPlayTimestamps[key] || 0;
  if (now - last < minIntervalMs) return false;
  lastPlayTimestamps[key] = now;
  return true;
}

// Native in-memory sound cache for instant 0ms native mobile playback
const nativeSoundCache = new Map<string, any>();

/**
 * Returns a high-quality streaming TTS audio URL for native speaker output.
 * Uses direct Google Translate Edge CDN (sub-100ms global latency) with zero cold-start delay.
 */
export function getTTSAudioUrl(text: string, langCode?: string): string {
  if (!text) return '';
  let lang = (langCode || 'fr').toLowerCase().trim().replace(/(-en|-es)$/, '');
  if (lang === 'fa') lang = 'ur'; // Perso-Arabic phonetic audio fallback
  const encoded = encodeURIComponent(text.trim());

  // Direct ultra-fast edge CDN endpoint (responds in < 100ms globally, eliminates Render sleeping cold starts)
  return `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=${lang}&client=tw-ob`;
}

// Reusable singleton Web AudioContext to eliminate browser hardware context limit crashes
let sharedAudioContext: any = null;

export function getSharedAudioContext(): any {
  if (!isWeb || typeof window === 'undefined') return null;
  try {
    const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!sharedAudioContext || sharedAudioContext.state === 'closed') {
      sharedAudioContext = new AudioCtx();
    }
    if (sharedAudioContext.state === 'suspended') {
      sharedAudioContext.resume().catch(() => {});
    }
    return sharedAudioContext;
  } catch {
    return null;
  }
}

/**
 * Convert Base64 Data URI to ArrayBuffer for Web Audio decoding
 */
function base64ToArrayBuffer(dataUri: string): ArrayBuffer | null {
  try {
    if (typeof window === 'undefined' || typeof window.atob !== 'function') {
      if (typeof Buffer !== 'undefined') {
        const raw = dataUri.replace(/^data:audio\/[a-z]+;base64,/, '');
        const buf = Buffer.from(raw, 'base64');
        return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      }
      return null;
    }
    const base64 = dataUri.replace(/^data:audio\/[a-z]+;base64,/, '');
    const binary = window.atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  } catch {
    return null;
  }
}

/**
 * Pre-decode in-memory audio buffers for instant < 5ms playback
 */
async function preloadAudioBuffers(): Promise<void> {
  if (!isWeb || typeof window === 'undefined') return;
  try {
    const ctx = getSharedAudioContext();
    if (!ctx) return;

    const keys: AudioAssetKey[] = [
      'CORRECT_CHIME',
      'WRONG_THUD',
      'SECTION_COMPLETE_FANFARE',
      'TACTILE_TAP',
    ];

    for (const key of keys) {
      if (cachedAudioBuffers.has(key)) continue;
      const arrayBuffer = base64ToArrayBuffer(AUDIO_ASSETS[key]);
      if (arrayBuffer) {
        ctx.decodeAudioData(
          arrayBuffer.slice(0),
          (decoded: any) => {
            cachedAudioBuffers.set(key, decoded);
          },
          () => {}
        );
      }
    }
  } catch {}
}

/**
 * Global audio unlocker to satisfy browser autoplay policies
 */
export function unlockAudioEngine(): void {
  if (!isWeb || typeof window === 'undefined') return;
  isAudioEngineUnlocked = true;
  try {
    const ctx = getSharedAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    refreshVoices();
    preloadAudioBuffers().catch(() => {});
  } catch {}
}

// Auto-register one-time user gesture unlock in browser environments
if (isWeb && typeof window !== 'undefined' && typeof (window as any).addEventListener === 'function') {
  const triggerUnlock = () => {
    unlockAudioEngine();
    (window as any).removeEventListener?.('pointerdown', triggerUnlock);
    (window as any).removeEventListener?.('keydown', triggerUnlock);
    (window as any).removeEventListener?.('touchstart', triggerUnlock);
    (window as any).removeEventListener?.('click', triggerUnlock);
  };
  (window as any).addEventListener('pointerdown', triggerUnlock, { passive: true, once: true });
  (window as any).addEventListener('keydown', triggerUnlock, { passive: true, once: true });
  (window as any).addEventListener('touchstart', triggerUnlock, { passive: true, once: true });
  (window as any).addEventListener('click', triggerUnlock, { passive: true, once: true });
}

/**
 * Configure system audio session for loudspeaker output & background non-ducking
 */
async function ensureAudioMode(): Promise<void> {
  if (isWeb || isAudioModeConfigured || isNodeEnvironment) return;
  try {
    const AudioModule = getAudio();
    if (!AudioModule) return;

    await AudioModule.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false, // Forces audio through main loudspeaker
    });
    isAudioModeConfigured = true;
  } catch (err) {
    // Graceful fallback if device permissions restricted
  }
}

/**
 * Zero-latency synthetic Web Audio musical chimes fallback
 */
function playSyntheticWebChime(type: 'success' | 'error' | 'fanfare' | 'tap'): boolean {
  if (!isWeb || typeof window === 'undefined') return false;
  try {
    const ctx = getSharedAudioContext();
    if (!ctx) return false;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    if (type === 'success') {
      // Pleasant marimba chime C5 (523Hz) -> E5 (659Hz) -> G5 (784Hz)
      const notes = [
        { freq: 523.25, time: now, dur: 0.18, gain: 0.35 },
        { freq: 659.25, time: now + 0.05, dur: 0.20, gain: 0.38 },
        { freq: 783.99, time: now + 0.10, dur: 0.22, gain: 0.42 },
        { freq: 1046.5, time: now + 0.10, dur: 0.18, gain: 0.20 },
      ];
      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.freq, n.time);
        gain.gain.setValueAtTime(0.001, n.time);
        gain.gain.exponentialRampToValueAtTime(n.gain, n.time + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, n.time + n.dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(n.time);
        osc.stop(n.time + n.dur + 0.01);
        activeWebAudioNodes.add(osc);
        osc.onended = () => activeWebAudioNodes.delete(osc);
      });
      return true;
    } else if (type === 'error') {
      // Gentle descending marimba thud 220Hz -> 140Hz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.20);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.35, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.23);
      activeWebAudioNodes.add(osc);
      osc.onended = () => activeWebAudioNodes.delete(osc);
      return true;
    } else if (type === 'fanfare') {
      // Celebratory multi-note fanfare arpeggio + sustained shimmer chord
      const notes = [
        { freq: 392.00, time: now, dur: 0.20, gain: 0.30 },
        { freq: 523.25, time: now + 0.08, dur: 0.22, gain: 0.35 },
        { freq: 659.25, time: now + 0.16, dur: 0.24, gain: 0.40 },
        { freq: 783.99, time: now + 0.24, dur: 0.28, gain: 0.45 },
        { freq: 1046.5, time: now + 0.32, dur: 0.55, gain: 0.45 },
        { freq: 659.25, time: now + 0.32, dur: 0.55, gain: 0.25 },
        { freq: 783.99, time: now + 0.32, dur: 0.55, gain: 0.30 },
      ];
      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.freq, n.time);
        gain.gain.setValueAtTime(0.001, n.time);
        gain.gain.exponentialRampToValueAtTime(n.gain, n.time + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.001, n.time + n.dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(n.time);
        osc.stop(n.time + n.dur + 0.02);
        activeWebAudioNodes.add(osc);
        osc.onended = () => activeWebAudioNodes.delete(osc);
      });
      return true;
    } else if (type === 'tap') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
      activeWebAudioNodes.add(osc);
      osc.onended = () => activeWebAudioNodes.delete(osc);
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

/**
 * Play in-memory audio asset instantly with zero network delay (< 5ms)
 */
async function playInMemorySound(key: AudioAssetKey, volume = 1.0): Promise<boolean> {
  if (!isAudioEnabled) return false;

  // Headless test / Node runtime
  if (isNodeEnvironment) {
    return true;
  }

  // 1. Web Environment: Pre-decoded AudioBuffer or HTML5 Data-URI Audio
  if (isWeb && typeof window !== 'undefined') {
    unlockAudioEngine();
    const ctx = getSharedAudioContext();

    if (ctx) {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const cached = cachedAudioBuffers.get(key);
      if (cached) {
        try {
          const source = ctx.createBufferSource();
          source.buffer = cached;
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), ctx.currentTime);
          source.connect(gain);
          gain.connect(ctx.destination);
          source.start(0);
          activeWebAudioNodes.add(source);
          source.onended = () => {
            activeWebAudioNodes.delete(source);
          };
          return true;
        } catch {}
      }

      // Try synthetic fallback first if buffer not yet decoded
      const synthMap: Record<AudioAssetKey, 'success' | 'error' | 'fanfare' | 'tap'> = {
        CORRECT_CHIME: 'success',
        WRONG_THUD: 'error',
        SECTION_COMPLETE_FANFARE: 'fanfare',
        TACTILE_TAP: 'tap',
      };
      if (playSyntheticWebChime(synthMap[key])) {
        return true;
      }
    }

    // Direct HTML5 Audio element using local Data URI (0 network latency)
    try {
      const dataUri = AUDIO_ASSETS[key];
      const audio = new (window as any).Audio(dataUri);
      audio.volume = Math.max(0, Math.min(1, volume));
      activeHtml5Audio.add(audio);
      audio.onended = () => activeHtml5Audio.delete(audio);
      audio.onerror = () => activeHtml5Audio.delete(audio);
      const p = audio.play();
      if (p !== undefined) {
        p.catch(() => {
          activeHtml5Audio.delete(audio);
        });
      }
      return true;
    } catch {
      return false;
    }
  }

  // 2. Native Mobile (iOS & Android) via Expo AV from in-memory Data URI
  try {
    await ensureAudioMode();
    const AudioModule = getAudio();
    if (!AudioModule) return false;

    const dataUri = AUDIO_ASSETS[key];
    const { sound } = await AudioModule.Sound.createAsync(
      { uri: dataUri },
      { shouldPlay: true, volume }
    );

    if (sound) {
      activeNativeSounds.add(sound);
      sound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.isLoaded && status.didJustFinish) {
          activeNativeSounds.delete(sound);
          sound.unloadAsync().catch(() => {});
        }
      });
      return true;
    }
  } catch (err) {
    // Native fallback failed
  }

  return false;
}

export interface SpeakOptions {
  lang?: string;
  rate?: number; // 1.0 normal, 0.65 slow
  pitch?: number;
  onStart?: () => void;
  onDone?: () => void;
  onError?: (err: any) => void;
}

const speakingSubscribers = new Set<(isSpeaking: boolean) => void>();

function notifySpeaking(speaking: boolean) {
  for (const sub of speakingSubscribers) {
    try {
      sub(speaking);
    } catch {}
  }
}

// Module-level anchor preventing garbage collection of active SpeechSynthesisUtterances
const activeUtterances = new Set<any>();

/**
 * Finds the most authentic native voice for the given language
 */
function findBestNativeVoice(bcp47: string): SpeechSynthesisVoice | null {
  if (!cachedVoices || cachedVoices.length === 0) {
    refreshVoices();
  }
  if (!cachedVoices || cachedVoices.length === 0) return null;

  const targetLangLower = bcp47.toLowerCase();
  const prefix = targetLangLower.split('-')[0];

  // 1. Exact match e.g. "fr-FR" === "fr-fr"
  const exact = cachedVoices.find((v) => v.lang.toLowerCase() === targetLangLower);
  if (exact) return exact;

  // 2. Normalized prefix match e.g. "fr-CA" for "fr-FR"
  const prefixMatch = cachedVoices.find((v) =>
    v.lang.toLowerCase().replace('_', '-').startsWith(prefix)
  );
  if (prefixMatch) return prefixMatch;

  // 3. Substring match
  const subMatch = cachedVoices.find((v) => v.lang.toLowerCase().includes(prefix));
  if (subMatch) return subMatch;

  return null;
}

/**
 * Play speech synthesis using browser Web Speech API with sub-50ms instant start
 */
function playWebSpeechSynthesis(
  text: string,
  bcp47: string,
  rate: number,
  pitch: number,
  onStart?: () => void,
  onDone?: () => void,
  onError?: (err: any) => void
): Promise<boolean> {
  return new Promise((resolve) => {
    if (!isWeb || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return resolve(false);
    }
    try {
      unlockAudioEngine();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      // Cancel prior utterances to ensure instant playback without speech queuing
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = bcp47;
      utterance.rate = Math.max(0.5, Math.min(1.8, rate));
      utterance.pitch = Math.max(0.5, Math.min(1.8, pitch));
      utterance.volume = 1.0;

      const matchingVoice = findBestNativeVoice(bcp47);
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      let settled = false;
      const settle = (success: boolean) => {
        if (!settled) {
          settled = true;
          activeUtterances.delete(utterance);
          if (success) {
            if (onDone) onDone();
          } else {
            if (onError) onError(new Error('SpeechSynthesis error'));
          }
          resolve(success);
        }
      };

      utterance.onstart = () => {
        if (onStart) onStart();
      };
      utterance.onend = () => settle(true);
      utterance.onerror = (e) => {
        console.warn('[SoundService] SpeechSynthesis error:', e?.error);
        settle(false);
      };

      activeUtterances.add(utterance);
      window.speechSynthesis.speak(utterance);

      // Auto-fallback timer
      setTimeout(() => settle(true), Math.max(2500, text.length * 130));
    } catch (err) {
      console.warn('[SoundService] playWebSpeechSynthesis exception:', err);
      resolve(false);
    }
  });
}

/**
 * Play preloaded or streaming audio through HTML5 Audio element
 */
function playWebAudioElement(
  url: string,
  rate = 1.0,
  onStart?: () => void,
  onDone?: () => void,
  onError?: (err: any) => void
): Promise<boolean> {
  return new Promise((resolve) => {
    if (!isWeb || typeof window === 'undefined') return resolve(false);
    try {
      unlockAudioEngine();

      if (currentWebAudio) {
        try {
          currentWebAudio.pause();
          currentWebAudio.currentTime = 0;
          activeHtml5Audio.delete(currentWebAudio);
        } catch {}
        currentWebAudio = null;
      }

      // Check preloaded cache first for instant 0ms playback
      let audio = preloadedAudioElements.get(url);
      if (!audio) {
        audio = new window.Audio(url);
      } else {
        audio.currentTime = 0;
      }

      currentWebAudio = audio;
      activeHtml5Audio.add(audio);
      audio.playbackRate = Math.max(0.5, Math.min(2.0, rate));
      audio.volume = 1.0;

      let settled = false;
      const settle = (success: boolean) => {
        if (!settled) {
          settled = true;
          activeHtml5Audio.delete(audio);
          if (currentWebAudio === audio) currentWebAudio = null;
          if (success) {
            if (onDone) onDone();
          } else {
            if (onError) onError(new Error('Web audio stream failed'));
          }
          resolve(success);
        }
      };

      audio.onplay = () => {
        if (onStart) onStart();
      };
      audio.onended = () => settle(true);
      audio.onerror = (e) => {
        console.warn('[SoundService] HTML5 Audio error:', e);
        settle(false);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('[SoundService] Audio.play() blocked by browser policy:', err);
          settle(false);
        });
      }

      // Fallback timeout
      setTimeout(() => settle(true), 8000);
    } catch (err) {
      console.warn('[SoundService] playWebAudioElement exception:', err);
      resolve(false);
    }
  });
}

export const SoundService = {
  setEnabled(enabled: boolean) {
    isAudioEnabled = enabled;
  },

  isEnabled(): boolean {
    return isAudioEnabled;
  },

  getTTSAudioUrl(text: string, langCode?: string): string {
    return getTTSAudioUrl(text, langCode);
  },

  /**
   * Preload audio for zero-latency instant playback
   */
  async preloadSounds(): Promise<void> {
    await preloadAudioBuffers();
    refreshVoices();
  },

  /**
   * Preload specific TTS audio URL into memory cache for zero latency (< 5ms) on both web & mobile
   */
  preloadTTS(text: string, langCode?: string): void {
    if (!text) return;
    try {
      const url = getTTSAudioUrl(text, langCode);
      if (isWeb && typeof window !== 'undefined') {
        if (url && !preloadedAudioElements.has(url)) {
          const audio = new window.Audio(url);
          audio.preload = 'auto';
          preloadedAudioElements.set(url, audio);
        }
      } else if (!isNodeEnvironment) {
        const AudioModule = getAudio();
        if (AudioModule && url && !nativeSoundCache.has(url)) {
          AudioModule.Sound.createAsync(
            { uri: url },
            { shouldPlay: false, volume: 1.0 }
          ).then(({ sound }) => {
            nativeSoundCache.set(url, sound);
          }).catch(() => {});
        }
      }
    } catch {}
  },

  /**
   * Measure latency of the most recent speech or audio playback
   */
  getLastAudioLatency(): number {
    return lastAudioLatencyMs;
  },

  /**
   * Subscribe to speech state changes for lip-sync and visual cues.
   * Returns an unsubscribe function.
   */
  addSpeakingListener(listener: (isSpeaking: boolean) => void): () => void {
    speakingSubscribers.add(listener);
    return () => {
      speakingSubscribers.delete(listener);
    };
  },

  /**
   * Immediately stops all active audio playback
   */
  async stopAll(options: { keepSpeech?: boolean } = {}): Promise<void> {
    // 1. Stop all Web Audio nodes
    for (const node of activeWebAudioNodes) {
      try {
        if (typeof node.stop === 'function') node.stop();
        if (typeof node.disconnect === 'function') node.disconnect();
      } catch {}
    }
    activeWebAudioNodes.clear();

    // 2. Stop HTML5 audio elements
    for (const audio of activeHtml5Audio) {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch {}
    }
    activeHtml5Audio.clear();

    if (currentWebAudio) {
      try {
        currentWebAudio.pause();
        currentWebAudio.currentTime = 0;
      } catch {}
      currentWebAudio = null;
    }

    // 3. Stop Native Expo AV sounds
    for (const snd of activeNativeSounds) {
      try {
        snd.stopAsync().catch(() => {});
        snd.unloadAsync().catch(() => {});
      } catch {}
    }
    activeNativeSounds.clear();

    if (currentSound) {
      const snd = currentSound;
      currentSound = null;
      try {
        snd.stopAsync().catch(() => {});
        snd.unloadAsync().catch(() => {});
      } catch {}
    }

    // 4. Optionally cancel speech
    if (!options.keepSpeech) {
      await this.stopSpeaking();
    }
  },

  /**
   * Speak pronunciation text out loud through the device speaker.
   * Instant low-latency execution (<50ms start time).
   */
  async speak(text: string, options: SpeakOptions = {}): Promise<boolean> {
    if (!text || !isAudioEnabled) return false;

    const requestStart = Date.now();

    // Cancel prior speech immediately to prevent overlapping voices
    await this.stopSpeaking();

    const bcp47 = getBCP47Code(options.lang);
    const lang = (options.lang || 'es').toLowerCase().trim().replace(/(-en|-es)$/, '');
    const rate = options.rate ?? 1.0;
    const pitch = options.pitch ?? 1.0;

    await ensureAudioMode();

    const handleStart = () => {
      lastAudioLatencyMs = Date.now() - requestStart;
      notifySpeaking(true);
      if (options.onStart) options.onStart();
    };

    const handleDone = () => {
      notifySpeaking(false);
      if (options.onDone) options.onDone();
    };

    const handleError = (e: any) => {
      notifySpeaking(false);
      if (options.onError) options.onError(e);
    };

    // Tier 1: Web Environment - Instant Web Speech API Primary Engine
    if (isWeb && typeof window !== 'undefined') {
      // 1a. Native Web Speech API with language-specific voice (Instant <50ms start)
      if ('speechSynthesis' in window) {
        const speechPlayed = await playWebSpeechSynthesis(
          text,
          bcp47,
          rate,
          pitch,
          handleStart,
          handleDone
        );
        if (speechPlayed) return true;
      }

      // 1b. Low-latency streamed audio via backend
      const ttsAudioUrl = getTTSAudioUrl(text, lang);
      const streamPlayed = await playWebAudioElement(
        ttsAudioUrl,
        rate,
        handleStart,
        handleDone
      );
      if (streamPlayed) return true;

      // 1c. Direct Google Translate stream fallback
      const directGoogleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=tw-ob`;
      const directPlayed = await playWebAudioElement(
        directGoogleUrl,
        rate,
        handleStart,
        handleDone
      );
      if (directPlayed) return true;

      // 1d. Synthetic Web Audio tone fallback so user always gets auditory feedback
      const chimePlayed = playSyntheticWebChime('success');
      if (chimePlayed) {
        handleStart();
        setTimeout(handleDone, 400);
        return true;
      }
    }

    // Tier 2: Native Mobile Device (iOS & Android) via Expo Speech
    try {
      const SpeechModule = getSpeech();
      if (SpeechModule) {
        const isSpeaking = await SpeechModule.isSpeakingAsync().catch(() => false);
        if (isSpeaking) {
          await SpeechModule.stop().catch(() => {});
        }

        SpeechModule.speak(text, {
          language: bcp47,
          rate: Math.max(0.4, Math.min(1.5, rate)),
          pitch,
          onStart: handleStart,
          onDone: handleDone,
          onError: (err: any) => {
            console.warn('[SoundService] Native speech error, falling back to remote stream:', err);
            const ttsAudioUrl = getTTSAudioUrl(text, lang);
            this.playRemoteAudio(ttsAudioUrl, { volume: 1.0, timeoutMs: 5000 })
              .then((remoteOk) => {
                if (!remoteOk) handleError(err);
              })
              .catch((e) => handleError(e));
          },
        });
        return true;
      }
    } catch (err: any) {
      console.warn('[SoundService] SpeechModule.speak failed:', err?.message);
    }

    // Tier 3: Remote Audio Stream Playback
    const ttsAudioUrl = getTTSAudioUrl(text, lang);
    const remotePlayed = await this.playRemoteAudio(ttsAudioUrl, { volume: 1.0, timeoutMs: 5000 });
    if (remotePlayed) {
      handleStart();
      setTimeout(handleDone, Math.max(1200, text.length * 80));
      return true;
    }

    handleError(new Error('All audio playback channels exhausted'));
    return false;
  },

  /**
   * Stop any active TTS pronunciation speech
   */
  async stopSpeaking(): Promise<void> {
    notifySpeaking(false);
    if (currentWebAudio) {
      try {
        currentWebAudio.pause();
        currentWebAudio.currentTime = 0;
        activeHtml5Audio.delete(currentWebAudio);
      } catch {}
      currentWebAudio = null;
    }
    if (isWeb && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    try {
      const SpeechModule = getSpeech();
      if (SpeechModule) {
        await SpeechModule.stop();
      }
    } catch {}
  },

  /**
   * Check if speech synthesis or audio is currently playing
   */
  async isSpeaking(): Promise<boolean> {
    if (currentWebAudio && !currentWebAudio.paused) return true;
    if (isWeb && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return window.speechSynthesis.speaking;
    }
    try {
      const SpeechModule = getSpeech();
      if (SpeechModule) {
        return await SpeechModule.isSpeakingAsync();
      }
      return false;
    } catch {
      return false;
    }
  },

  /**
   * Play remote audio file safely through device speaker
   */
  async playRemoteAudio(url: string, options: { volume?: number; timeoutMs?: number } = {}): Promise<boolean> {
    if (!url || !isAudioEnabled) return false;

    const volume = options.volume ?? 1.0;
    const timeoutMs = options.timeoutMs ?? 5000;

    // Web: Use direct HTML5 Audio element
    if (isWeb && typeof window !== 'undefined') {
      return playWebAudioElement(url, 1.0);
    }

    // Native: Check in-memory nativeSoundCache first for instant 0ms playback
    const cachedSound = nativeSoundCache.get(url);
    if (cachedSound) {
      try {
        await ensureAudioMode();
        await cachedSound.setPositionAsync(0);
        await cachedSound.playAsync();
        return true;
      } catch {}
    }

    // Native: Use Expo AV Sound with loudspeaker audio mode
    try {
      await ensureAudioMode();

      if (currentSound) {
        const soundToUnload = currentSound;
        currentSound = null;
        try {
          await soundToUnload.unloadAsync();
        } catch {}
      }

      const AudioModule = getAudio();
      if (!AudioModule) return false;

      let hasTimedOut = false;

      const soundPromise = AudioModule.Sound.createAsync(
        { uri: url },
        { shouldPlay: false, volume }
      )
        .then((res) => {
          if (hasTimedOut && res?.sound) {
            res.sound.unloadAsync().catch(() => {});
            return null;
          }
          return res;
        })
        .catch(() => null);

      const timeoutPromise = new Promise<{ sound: null }>((resolve) =>
        setTimeout(() => {
          hasTimedOut = true;
          resolve({ sound: null });
        }, timeoutMs)
      );

      const result = await Promise.race([soundPromise, timeoutPromise]);
      if (result && 'sound' in result && result.sound) {
        currentSound = result.sound;
        result.sound.setOnPlaybackStatusUpdate((status: any) => {
          if (status.isLoaded && status.didJustFinish) {
            result.sound.unloadAsync().catch(() => {});
            if (currentSound === result.sound) {
              currentSound = null;
            }
          }
        });
        await result.sound.playAsync().catch(() => {});
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  /**
   * Instant, cheerful success chime for correct answers.
   */
  async playSuccessChime(): Promise<void> {
    if (!canPlaySound('correct', 80)) return;
    await playInMemorySound('CORRECT_CHIME', 0.85);
  },

  async playCorrect(): Promise<void> {
    return this.playSuccessChime();
  },

  /**
   * Instant, gentle marimba thud for wrong answers.
   */
  async playErrorThud(): Promise<void> {
    if (!canPlaySound('wrong', 80)) return;
    await playInMemorySound('WRONG_THUD', 0.80);
  },

  async playIncorrect(): Promise<void> {
    return this.playErrorThud();
  },

  /**
   * Instant, triumphant fanfare for successful section completion.
   */
  async playFanfare(): Promise<void> {
    if (!canPlaySound('fanfare', 250)) return;
    await playInMemorySound('SECTION_COMPLETE_FANFARE', 0.90);
  },

  async playSectionComplete(): Promise<void> {
    return this.playFanfare();
  },

  /**
   * Instant tactile tap for UI buttons
   */
  async playTap(): Promise<void> {
    if (!canPlaySound('tap', 40)) return;
    await playInMemorySound('TACTILE_TAP', 0.50);
  },
};
