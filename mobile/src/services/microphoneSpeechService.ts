/**
 * Production Microphone Validation & Real-Time Speech Recognition Service
 *
 * Implements strict hardware/browser microphone verification:
 * - Permission detection (granted, denied, prompt, unavailable)
 * - Real-time audio energy & RMS silence/noise detection
 * - Silence rejection (never passes exercises without actual speech input)
 * - Multi-language Speech Recognition configured for the active learning language
 * - Error classification: PERMISSION_DENIED, UNAVAILABLE, NO_SPEECH, INTERRUPTED, RECOGNITION_FAILED, SUCCESS
 */

import { getBCP47Code } from '../data/courses/bcp47';

export type MicrophoneStatus =
  | 'IDLE'
  | 'INITIALIZING'
  | 'RECORDING'
  | 'PERMISSION_DENIED'
  | 'UNAVAILABLE'
  | 'NO_SPEECH'
  | 'INTERRUPTED'
  | 'RECOGNITION_FAILED'
  | 'SUCCESS';

export interface SpeechEvaluationResult {
  success: boolean;
  status: MicrophoneStatus;
  message: string;
  transcript: string;
  accuracy: number; // 0 - 100
  speechDurationMs: number;
  peakVolume: number;
}

export interface RecordingOptions {
  targetLanguage?: string;
  phraseToSpeak?: string;
  onVolume?: (rms: number) => void;
  onInterimResult?: (transcript: string) => void;
  minSpeechDurationMs?: number; // default 350ms
  silenceRmsThreshold?: number; // default 0.02
}

class MicrophoneSpeechServiceImpl {
  private activeStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private recognitionInstance: any = null;
  private animationFrameId: number | null = null;
  private isSessionActive = false;

  private sessionStartTime = 0;
  private activeSpeechDurationMs = 0;
  private peakRms = 0;
  private capturedTranscript = '';
  private currentStatus: MicrophoneStatus = 'IDLE';

  /**
   * Check whether microphone hardware is available and permission state
   */
  isHardwareSupported(): boolean {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }
    return Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  async checkPermission(): Promise<'granted' | 'denied' | 'prompt' | 'unavailable'> {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return 'unavailable';
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return 'unavailable';
    }

    try {
      if (navigator.permissions && navigator.permissions.query) {
        const perm = await navigator.permissions.query({ name: 'microphone' as any });
        if (perm.state === 'granted' || perm.state === 'denied' || perm.state === 'prompt') {
          return perm.state;
        }
      }
    } catch {}

    return 'prompt';
  }

  /**
   * Start a genuine microphone listening & audio metering session
   */
  async startRecording(options: RecordingOptions = {}): Promise<{
    started: boolean;
    status: MicrophoneStatus;
    errorMessage?: string;
  }> {
    if (this.isSessionActive) {
      await this.cancelRecording();
    }

    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return { started: false, status: 'UNAVAILABLE', errorMessage: 'Audio is not supported in this environment.' };
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return { started: false, status: 'UNAVAILABLE', errorMessage: 'Microphone is unavailable on this device or browser.' };
    }

    this.currentStatus = 'INITIALIZING';
    this.sessionStartTime = Date.now();
    this.activeSpeechDurationMs = 0;
    this.peakRms = 0;
    this.capturedTranscript = '';
    this.isSessionActive = true;

    // 1. Request Genuine Hardware Microphone Stream
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      this.activeStream = stream;
    } catch (err: any) {
      this.isSessionActive = false;
      if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError') {
        this.currentStatus = 'PERMISSION_DENIED';
        return {
          started: false,
          status: 'PERMISSION_DENIED',
          errorMessage: 'Microphone permission denied. Please allow microphone access in your browser or device settings.',
        };
      }
      if (err?.name === 'NotFoundError' || err?.name === 'DevicesNotFoundError') {
        this.currentStatus = 'UNAVAILABLE';
        return {
          started: false,
          status: 'UNAVAILABLE',
          errorMessage: 'No microphone was found on your device. Please connect a microphone to practice speaking.',
        };
      }
      this.currentStatus = 'UNAVAILABLE';
      return {
        started: false,
        status: 'UNAVAILABLE',
        errorMessage: err?.message || 'Failed to initialize microphone.',
      };
    }

    // 2. Initialize Real-Time Web Audio RMS Volume Analyser
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
        if (this.audioContext && this.audioContext.state === 'suspended') {
          this.audioContext.resume().catch(() => {});
        }
        const source = this.audioContext.createMediaStreamSource(this.activeStream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 512;
        this.analyser.smoothingTimeConstant = 0.2;
        source.connect(this.analyser);

        const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        const silenceThreshold = options.silenceRmsThreshold ?? 0.02;

        let lastCheck = Date.now();

        const monitorVolume = () => {
          if (!this.isSessionActive || !this.analyser) return;

          this.analyser.getByteTimeDomainData(dataArray);
          let sumSquares = 0;
          for (let i = 0; i < dataArray.length; i++) {
            const normalized = (dataArray[i] - 128) / 128;
            sumSquares += normalized * normalized;
          }
          const rms = Math.sqrt(sumSquares / dataArray.length);

          if (rms > this.peakRms) {
            this.peakRms = rms;
          }

          const now = Date.now();
          const deltaMs = now - lastCheck;
          lastCheck = now;

          if (rms > silenceThreshold) {
            this.activeSpeechDurationMs += deltaMs;
          }

          if (options.onVolume) {
            options.onVolume(Math.min(1.0, rms * 4.5)); // Scale up for visual feedback
          }

          this.animationFrameId = requestAnimationFrame(monitorVolume);
        };

        this.animationFrameId = requestAnimationFrame(monitorVolume);
      }
    } catch (e) {
      console.warn('[MicrophoneSpeechService] AudioContext analyser warning:', e);
    }

    // 3. Initialize Target-Language Web Speech Recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        const bcp47 = getBCP47Code(options.targetLanguage || 'fr');
        recognition.lang = bcp47;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 3;

        recognition.onresult = (event: any) => {
          let interim = '';
          let final = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              final += transcript;
            } else {
              interim += transcript;
            }
          }

          const recognized = (final || interim).trim();
          if (recognized) {
            this.capturedTranscript = recognized;
            if (options.onInterimResult) {
              options.onInterimResult(recognized);
            }
          }
        };

        recognition.onerror = (event: any) => {
          if (event.error === 'no-speech') {
            // Handled on stop
          } else if (event.error === 'not-allowed') {
            this.currentStatus = 'PERMISSION_DENIED';
          } else if (event.error === 'audio-capture') {
            this.currentStatus = 'UNAVAILABLE';
          }
        };

        recognition.start();
        this.recognitionInstance = recognition;
      } catch (e) {
        console.warn('[MicrophoneSpeechService] SpeechRecognition start warning:', e);
      }
    }

    this.currentStatus = 'RECORDING';
    return { started: true, status: 'RECORDING' };
  }

  /**
   * Stop recording, validate that genuine speech occurred, and evaluate accuracy.
   */
  async stopRecording(phraseToSpeak?: string): Promise<SpeechEvaluationResult> {
    this.isSessionActive = false;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.recognitionInstance) {
      try {
        this.recognitionInstance.stop();
      } catch {}
      this.recognitionInstance = null;
    }

    // Teardown tracks
    if (this.activeStream) {
      this.activeStream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {}
      });
      this.activeStream = null;
    }

    if (this.audioContext) {
      try {
        this.audioContext.close().catch(() => {});
      } catch {}
      this.audioContext = null;
      this.analyser = null;
    }

    const duration = Date.now() - this.sessionStartTime;
    const speechDuration = this.activeSpeechDurationMs;
    const peakVolume = this.peakRms;
    const transcript = this.capturedTranscript.trim();

    // 1. Check for Complete Silence / No Voice Input (STRICT FALSE SUCCESS PREVENTION)
    const isSilent = peakVolume < 0.02 || speechDuration < 280;
    if (isSilent && !transcript) {
      this.currentStatus = 'NO_SPEECH';
      return {
        success: false,
        status: 'NO_SPEECH',
        message: 'No speech was detected. We did not hear any voice input. Please speak aloud into your microphone.',
        transcript: '',
        accuracy: 0,
        speechDurationMs: speechDuration,
        peakVolume,
      };
    }

    // 2. If voice was heard but no intelligible speech transcribed
    if (!transcript) {
      // If voice energy was substantial, user spoke something unrecognizable
      this.currentStatus = 'RECOGNITION_FAILED';
      return {
        success: false,
        status: 'RECOGNITION_FAILED',
        message: 'Speech was detected, but we could not recognize the target phrase clearly. Please try speaking slowly and clearly.',
        transcript: '',
        accuracy: 0,
        speechDurationMs: speechDuration,
        peakVolume,
      };
    }

    // 3. Genuine Recognized Speech: Compute Accent-Tolerant Linguistic Similarity
    const target = this.normalize(phraseToSpeak || '');
    const spoken = this.normalize(transcript);

    const accuracy = this.calculateSimilarity(target, spoken);
    const passed = accuracy >= 70; // 70% pedagogical threshold for mobile/web speech

    this.currentStatus = passed ? 'SUCCESS' : 'RECOGNITION_FAILED';

    return {
      success: passed,
      status: this.currentStatus,
      message: passed
        ? `Great pronunciation! Accuracy: ${accuracy}%`
        : `Pronunciation accuracy was ${accuracy}%. Expected: "${phraseToSpeak}"`,
      transcript,
      accuracy,
      speechDurationMs: speechDuration,
      peakVolume,
    };
  }

  /**
   * Cancel and discard current recording session
   */
  async cancelRecording(): Promise<void> {
    this.isSessionActive = false;
    this.currentStatus = 'INTERRUPTED';

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.recognitionInstance) {
      try {
        this.recognitionInstance.abort();
      } catch {}
      this.recognitionInstance = null;
    }

    if (this.activeStream) {
      this.activeStream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {}
      });
      this.activeStream = null;
    }

    if (this.audioContext) {
      try {
        this.audioContext.close().catch(() => {});
      } catch {}
      this.audioContext = null;
      this.analyser = null;
    }
  }

  /**
   * Helper: Normalize text by stripping diacritics and punctuation
   */
  private normalize(str: string): string {
    return str
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?¿¡!"«»]/g, '')
      .replace(/\s+/g, ' ');
  }

  /**
   * Helper: Calculate word overlap & Levenshtein similarity percentage
   */
  private calculateSimilarity(target: string, spoken: string): number {
    if (!target && !spoken) return 100;
    if (!target || !spoken) return 0;
    if (target === spoken) return 100;

    const targetWords = target.split(' ').filter(Boolean);
    const spokenWords = spoken.split(' ').filter(Boolean);

    if (targetWords.length === 0) return 0;

    let matchedWords = 0;
    for (const w of targetWords) {
      if (spokenWords.includes(w)) {
        matchedWords++;
      } else {
        // Partial fuzzy word match (e.g. 1 char typo)
        const hasFuzzy = spokenWords.some((sw) => {
          if (Math.abs(sw.length - w.length) > 1) return false;
          let diff = 0;
          const minLen = Math.min(sw.length, w.length);
          for (let i = 0; i < minLen; i++) {
            if (sw[i] !== w[i]) diff++;
          }
          return diff <= 1;
        });
        if (hasFuzzy) matchedWords += 0.75;
      }
    }

    const wordAccuracy = Math.min(100, Math.round((matchedWords / targetWords.length) * 100));
    return wordAccuracy;
  }
}

export const MicrophoneSpeechService = new MicrophoneSpeechServiceImpl();
