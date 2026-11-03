import type { Audio as AudioType } from 'expo-av';
import type * as SpeechType from 'expo-speech';

const isWeb = typeof window !== 'undefined';

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
let isAudioEnabled = true;
let isAudioModeConfigured = false;

// BCP-47 language tag mappings for all 38 platform languages
export const LANGUAGE_BCP47_MAP: Record<string, string> = {
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  pt: 'pt-BR',
  ja: 'ja-JP',
  ko: 'ko-KR',
  zh: 'zh-CN',
  hi: 'hi-IN',
  ar: 'ar-SA',
  ru: 'ru-RU',
  nl: 'nl-NL',
  tr: 'tr-TR',
  sv: 'sv-SE',
  no: 'no-NO',
  da: 'da-DK',
  pl: 'pl-PL',
  el: 'el-GR',
  he: 'he-IL',
  th: 'th-TH',
  vi: 'vi-VN',
  id: 'id-ID',
  ms: 'ms-MY',
  tl: 'fil-PH',
  bn: 'bn-IN',
  ur: 'ur-PK',
  pa: 'pa-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  uk: 'uk-UA',
  fa: 'fa-IR',
  sw: 'sw-KE',
  ro: 'ro-RO',
  cs: 'cs-CZ',
  hu: 'hu-HU',
};

export function getBCP47Code(langCode?: string): string {
  if (!langCode) return 'en-US';
  const clean = langCode.toLowerCase().trim().replace(/(-en|-es)$/, '');
  return LANGUAGE_BCP47_MAP[clean] || (clean.length === 2 ? `${clean}-${clean.toUpperCase()}` : 'en-US');
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
      playThroughEarpieceAndroid: false, // Force loudspeaker output
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
    const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return false;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

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

export const SoundService = {
  setEnabled(enabled: boolean) {
    isAudioEnabled = enabled;
  },

  isEnabled(): boolean {
    return isAudioEnabled;
  },

  /**
   * Speak pronunciation text out loud via native speech synthesizer or Web Speech API.
   * Works on iOS, Android, Desktop and Mobile Web across all 38 languages.
   */
  async speak(text: string, options: SpeakOptions = {}): Promise<boolean> {
    if (!text || !isAudioEnabled) return false;

    const bcp47 = getBCP47Code(options.lang);
    const rate = options.rate ?? 1.0;
    const pitch = options.pitch ?? 1.0;

    await ensureAudioMode();

    // 1. Browser Web Speech API path
    if (isWeb && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
        window.speechSynthesis.cancel(); // Stop any pending speech

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = bcp47;
        utterance.rate = rate;
        utterance.pitch = pitch;

        if (options.onStart) utterance.onstart = () => options.onStart!();
        if (options.onDone) utterance.onend = () => options.onDone!();
        if (options.onError) utterance.onerror = (e) => options.onError!(e);

        window.speechSynthesis.speak(utterance);
        return true;
      } catch (err) {
        console.warn('[SoundService] Web Speech error:', err);
      }
    }

    // 2. Native Expo Speech path (iOS & Android)
    try {
      const SpeechModule = getSpeech();
      if (SpeechModule) {
        const isSpeaking = await SpeechModule.isSpeakingAsync().catch(() => false);
        if (isSpeaking) {
          await SpeechModule.stop();
        }

        SpeechModule.speak(text, {
          language: bcp47,
          rate: Math.max(0.4, Math.min(1.5, rate)),
          pitch,
          onStart: options.onStart,
          onDone: options.onDone,
          onError: options.onError,
        });
        return true;
      }
    } catch (err: any) {
      console.warn('[SoundService] Speech.speak failed:', err?.message);
      if (options.onError) options.onError(err);
      return false;
    }

    return false;
  },

  /**
   * Stop any active TTS pronunciation speech
   */
  async stopSpeaking(): Promise<void> {
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
   * Check if speech synthesis is currently active
   */
  async isSpeaking(): Promise<boolean> {
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
   * Play remote audio file safely with speaker output and timeout handling
   */
  async playRemoteAudio(url: string, options: { volume?: number; timeoutMs?: number } = {}): Promise<boolean> {
    if (!url || !isAudioEnabled) return false;

    const volume = options.volume ?? 0.85;
    const timeoutMs = options.timeoutMs ?? 4000;

    try {
      await ensureAudioMode();

      // Clean up previous sound if playing
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

  async playErrorThud(): Promise<void> {
    if (playSyntheticWebChime('error')) return;
    try {
      await this.playRemoteAudio('https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg');
    } catch {}
  },

  async playFanfare(): Promise<void> {
    if (playSyntheticWebChime('fanfare')) return;
    try {
      await this.playRemoteAudio('https://actions.google.com/sounds/v1/cartoon/climb_up.ogg');
    } catch {}
  },
};
