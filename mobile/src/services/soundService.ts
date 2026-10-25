import { Audio } from 'expo-av';

let currentSound: Audio.Sound | null = null;

export const SoundService = {
  async playRemoteAudio(url: string): Promise<void> {
    if (!url) return;
    try {
      if (currentSound) {
        await currentSound.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );
      currentSound = sound;
    } catch (e) {
      console.warn('[SoundService] Could not play remote audio:', e);
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
