import { Audio } from 'expo-av';
import { Platform } from 'react-native';

let currentSound: Audio.Sound | null = null;
let isAudioEnabled = true;
let isAudioModeConfigured = false;

async function ensureAudioMode(): Promise<void> {
  if (isAudioModeConfigured || Platform.OS === 'web') return;
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
    isAudioModeConfigured = true;
  } catch {
    // If setting audio mode fails (e.g. unsupported device or permission), fallback silently
  }
}

export const SoundService = {
  setEnabled(enabled: boolean) {
    isAudioEnabled = enabled;
  },

  async playRemoteAudio(url: string): Promise<void> {
    if (!url || !isAudioEnabled) return;

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

      let hasTimedOut = false;

      // Safe creation with shouldPlay: false so listener can be bound first
      const soundPromise = Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: false, volume: 0.75 }
      )
        .then((res) => {
          if (hasTimedOut && res?.sound) {
            // Clean up if created after timeout
            res.sound.unloadAsync().catch(() => {});
            return null;
          }
          return res;
        })
        .catch(() => null);

      // Safe timeout that resolves rather than rejects
      const timeoutPromise = new Promise<{ sound: null }>((resolve) =>
        setTimeout(() => {
          hasTimedOut = true;
          resolve({ sound: null });
        }, 1200)
      );

      const result = await Promise.race([soundPromise, timeoutPromise]);
      if (result && 'sound' in result && result.sound) {
        currentSound = result.sound;
        result.sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            result.sound.unloadAsync().catch(() => {});
            if (currentSound === result.sound) {
              currentSound = null;
            }
          }
        });
        await result.sound.playAsync().catch(() => {});
      }
    } catch {
      // 100% fail-safe: NEVER throw or crash the UI
    }
  },

  async playSuccessChime(): Promise<void> {
    try {
      await this.playRemoteAudio('https://actions.google.com/sounds/v1/cartoon/pop.ogg');
    } catch {}
  },

  async playErrorThud(): Promise<void> {
    try {
      await this.playRemoteAudio('https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg');
    } catch {}
  },

  async playFanfare(): Promise<void> {
    try {
      await this.playRemoteAudio('https://actions.google.com/sounds/v1/cartoon/climb_up.ogg');
    } catch {}
  },
};
