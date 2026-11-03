import { Audio } from 'expo-av';

let currentSound: Audio.Sound | null = null;
let isAudioEnabled = true;

export const SoundService = {
  setEnabled(enabled: boolean) {
    isAudioEnabled = enabled;
  },

  async playRemoteAudio(url: string): Promise<void> {
    if (!url || !isAudioEnabled) return;
    try {
      if (currentSound) {
        try {
          await currentSound.unloadAsync();
        } catch (_) {}
        currentSound = null;
      }

      // Race with 1.2s timeout so offline/slow network never hangs UI
      const soundPromise = Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );
      const timeoutPromise = new Promise<{ sound: null }>((_, reject) =>
        setTimeout(() => reject(new Error('Audio timeout')), 1200)
      );

      const result = await Promise.race([soundPromise, timeoutPromise]);
      if (result && 'sound' in result && result.sound) {
        currentSound = result.sound;
      }
    } catch (_) {
      // Graceful silent fallback
    }
  },

  async playSuccessChime(): Promise<void> {
    await this.playRemoteAudio('https://actions.google.com/sounds/v1/cartoon/pop.ogg');
  },

  async playErrorThud(): Promise<void> {
    await this.playRemoteAudio('https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg');
  },

  async playFanfare(): Promise<void> {
    await this.playRemoteAudio('https://actions.google.com/sounds/v1/cartoon/climb_up.ogg');
  },
};
