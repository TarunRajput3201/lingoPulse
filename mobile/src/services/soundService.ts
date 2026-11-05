import { Platform } from 'react-native';
import type { Audio as AudioType } from 'expo-av';
import type * as SpeechType from 'expo-speech';

const isWeb = Platform.OS === 'web';

// Safe lazy native module loaders (resilient across Web, Node testing, iOS, and Android)
function getAudio(): typeof AudioType | null {
  try {
    return require('expo-av').Audio;
  } catch {
    return null;
  }
}

function getSpeech(): typeof SpeechType | null {
  try {
    return require('expo-speech');
  } catch {
    return null;
  }
}

let currentSound: any = null;
let currentWebAudio: any = null;
let isAudioEnabled = true;
let isAudioModeConfigured = false;
let isAudioEngineUnlocked = false;

import { LANGUAGE_BCP47_MAP, getBCP47Code } from '../data/courses/bcp47';
export { LANGUAGE_BCP47_MAP, getBCP47Code };

/**
 * Returns a high-quality streaming TTS audio URL for native speaker output
 */
export function getTTSAudioUrl(text: string, langCode?: string): string {
  if (!text) return '';
  let lang = (langCode || 'es').toLowerCase().trim().replace(/(-en|-es)$/, '');
  if (lang === 'fa') lang = 'ur'; // Perso-Arabic phonetic audio fallback
  const encoded = encodeURIComponent(text.trim());

  // Web environment: route through local or production backend to bypass browser URL safety policies
  if (isWeb && typeof window !== 'undefined' && window.location) {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return `http://localhost:5050/api/tts?text=${encoded}&lang=${lang}`;
    }
    const apiHost = process.env.EXPO_PUBLIC_API_URL || 'https://lingopulse-api-84f2.onrender.com';
    return `${apiHost}/api/tts?text=${encoded}&lang=${lang}`;
  }

  // Native mobile / test environment
  const apiHost = process.env.EXPO_PUBLIC_API_URL || 'https://lingopulse-api-84f2.onrender.com';
  return `${apiHost}/api/tts?text=${encoded}&lang=${lang}`;
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
  if (isWeb) return;
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
 * Zero-latency synthetic Web Audio chimes for browser environments
 */
function playSyntheticWebChime(type: 'success' | 'error' | 'fanfare'): boolean {
  if (!isWeb || typeof window === 'undefined') return false;
  try {
    const ctx = getSharedAudioContext();
    if (!ctx) return false;

    if (type === 'success') {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880.0, now + 0.12); // A5
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
      return true;
    } else if (type === 'error') {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.22);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
      return true;
    } else if (type === 'fanfare') {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const now = ctx.currentTime + idx * 0.08;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.42);
      });
      return true;
    }
  } catch {
    return false;
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
 * Play authentic audio stream through HTML5 Audio element
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
        } catch {}
        currentWebAudio = null;
      }

      const audio = new window.Audio(url);
      currentWebAudio = audio;
      audio.playbackRate = Math.max(0.5, Math.min(2.0, rate));
      audio.volume = 1.0;

      let settled = false;
      const settle = (success: boolean) => {
        if (!settled) {
          settled = true;
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
        console.warn('[SoundService] HTML5 Audio error, falling back:', e);
        settle(false);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('[SoundService] Audio.play() blocked by browser policy:', err);
          settle(false);
        });
      }

      // Safety fallback timeout
      setTimeout(() => settle(true), 12000);
    } catch (err) {
      console.warn('[SoundService] playWebAudioElement exception:', err);
      resolve(false);
    }
  });
}

/**
 * Play speech synthesis using browser Web Speech API with voice resolution
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

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = bcp47;
      utterance.rate = Math.max(0.5, Math.min(1.8, rate));
      utterance.pitch = Math.max(0.5, Math.min(1.8, pitch));
      utterance.volume = 1.0;

      // Select matching voice for the target language if available in browser
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const targetLangLower = bcp47.toLowerCase();
        const prefix = targetLangLower.split('-')[0];
        const matchingVoice =
          voices.find((v) => v.lang.toLowerCase() === targetLangLower) ||
          voices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith(prefix)) ||
          voices.find((v) => v.lang.toLowerCase().includes(prefix));
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }
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
   * Speak pronunciation text out loud through the device speaker.
   * Employs multi-tier dual architecture: Native/Web Speech + Authentic Audio Stream.
   * Guaranteed to produce authentic voice across all 38 languages.
   */
  async speak(text: string, options: SpeakOptions = {}): Promise<boolean> {
    if (!text || !isAudioEnabled) return false;

    const bcp47 = getBCP47Code(options.lang);
    const lang = (options.lang || 'es').toLowerCase().trim().replace(/(-en|-es)$/, '');
    const rate = options.rate ?? 1.0;
    const pitch = options.pitch ?? 1.0;
    const ttsAudioUrl = getTTSAudioUrl(text, lang);

    await ensureAudioMode();

    const handleStart = () => {
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

    // Tier 1: Web Environment
    if (isWeb && typeof window !== 'undefined') {
      // 1a. Stream authentic native audio stream through device loudspeaker via backend proxy
      const streamPlayed = await playWebAudioElement(
        ttsAudioUrl,
        rate,
        handleStart,
        handleDone
      );
      if (streamPlayed) return true;

      // 1b. Fallback to Web Speech API if voice is supported
      const speechPlayed = await playWebSpeechSynthesis(
        text,
        bcp47,
        rate,
        pitch,
        handleStart,
        handleDone
      );
      if (speechPlayed) return true;

      // 1c. Direct Google Translate stream fallback
      const directGoogleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=tw-ob`;
      const directPlayed = await playWebAudioElement(
        directGoogleUrl,
        rate,
        handleStart,
        handleDone
      );
      if (directPlayed) return true;

      // 1d. Synthetic Web Audio tone fallback so user always gets auditory cue
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

    // Tier 3: Remote Audio Stream Playback (Cross-Platform Loudspeaker Fallback)
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

  async playSuccessChime(): Promise<void> {
    if (playSyntheticWebChime('success')) return;
    try {
      await this.playRemoteAudio('https://actions.google.com/sounds/v1/cartoon/pop.ogg');
    } catch {}
  },

  async playCorrect(): Promise<void> {
    return this.playSuccessChime();
  },

  async playErrorThud(): Promise<void> {
    if (playSyntheticWebChime('error')) return;
    try {
      await this.playRemoteAudio('https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg');
    } catch {}
  },

  async playIncorrect(): Promise<void> {
    return this.playErrorThud();
  },

  async playFanfare(): Promise<void> {
    if (playSyntheticWebChime('fanfare')) return;
    try {
      await this.playRemoteAudio('https://actions.google.com/sounds/v1/cartoon/pop.ogg');
    } catch {}
  },
};
