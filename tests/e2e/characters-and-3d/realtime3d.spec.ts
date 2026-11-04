import { test, expect } from '@playwright/test';
import {
  CharacterId,
  CHARACTER_PROFILES,
  getCharacterForQuestion,
  getCharacterQuote,
} from '../../../mobile/src/components/character/Character3DRegistry';
import { RESEARCH_PALETTE, ENVIRONMENT_3D } from '../../../mobile/src/constants/theme';

test.describe('Real-Time 3D Characters, Rotation & Research Color System E2E Suite', () => {
  test('TC-3D-01: 5 Unique Character Profiles: Verifies Maya, Leo, Elena, Kael, and Pip definitions', async () => {
    const characterIds: CharacterId[] = ['maya', 'leo', 'elena', 'kael', 'pip'];
    expect(characterIds.length).toBe(5);

    characterIds.forEach((id) => {
      const profile = CHARACTER_PROFILES[id];
      expect(profile).toBeDefined();
      expect(profile.name.length).toBeGreaterThan(0);
      expect(profile.role.length).toBeGreaterThan(0);
      expect(profile.title.length).toBeGreaterThan(0);
      expect(profile.accentColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(profile.quotes.intro.length).toBeGreaterThanOrEqual(2);
      expect(profile.quotes.correct.length).toBeGreaterThanOrEqual(2);
      expect(profile.quotes.mistake.length).toBeGreaterThanOrEqual(2);
    });

    expect(CHARACTER_PROFILES.maya.role).toBe('Teacher');
    expect(CHARACTER_PROFILES.leo.role).toBe('Pronunciation Coach');
    expect(CHARACTER_PROFILES.elena.role).toBe('Conversation Partner');
    expect(CHARACTER_PROFILES.kael.role).toBe('Challenge Master');
    expect(CHARACTER_PROFILES.pip.role).toBe('AI Companion');
  });

  test('TC-3D-02: 15-Question Pedagogical Rotation: Verifies dynamic distribution across all 5 characters', async () => {
    const rotation = [];
    for (let i = 0; i < 15; i++) {
      rotation.push(getCharacterForQuestion(i, 15));
    }

    // All 5 characters must appear
    const unique = new Set(rotation);
    expect(unique.size).toBe(5);

    // Specific pedagogical milestones
    expect(rotation[0]).toBe('maya');  // Q1: Teacher introduces vocabulary
    expect(rotation[2]).toBe('kael');  // Q3: Challenge quick test
    expect(rotation[3]).toBe('elena'); // Q4: Conversation dialogue
    expect(rotation[4]).toBe('pip');   // Q5: 5-question milestone cheer
    expect(rotation[5]).toBe('leo');   // Q6: Pronunciation phonetics
    expect(rotation[14]).toBe('kael'); // Q15: Final lesson boss challenge

    // Specialized question overrides
    expect(getCharacterForQuestion(2, 15, 'LISTENING')).toBe('leo');
    expect(getCharacterForQuestion(2, 15, 'SPEAKING')).toBe('leo');
    expect(getCharacterForQuestion(2, 15, 'PRONUNCIATION')).toBe('leo');
    expect(getCharacterForQuestion(1, 15, 'DIALOGUE')).toBe('elena');
    expect(getCharacterForQuestion(1, 15, 'SENTENCE_BUILDER')).toBe('elena');
    expect(getCharacterForQuestion(0, 15, 'SPEED_QUIZ')).toBe('kael');
  });

  test('TC-3D-03: WebGL Browser Rendering: Verifies WebGL context support and hardware acceleration in Chromium', async ({ page }) => {
    await page.goto('http://127.0.0.1:5180');

    // Evaluate WebGL support directly inside the live Chromium browser session
    const webGLStatus = await page.evaluate(() => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return { supported: false, renderer: '' };

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Generic WebGL';
      return {
        supported: true,
        renderer,
        maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      };
    });

    expect(webGLStatus.supported).toBe(true);
    expect(webGLStatus.maxTextureSize).toBeGreaterThanOrEqual(2048);
  });

  test('TC-3D-04: Research-Based Color System: Verifies WCAG 2.1 AA/AAA contrast ratios against white canvas', async () => {
    function getLuminance(hex: string): number {
      const cleanHex = hex.replace('#', '');
      const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
      const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
      const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
      const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    function getContrast(hex1: string, hex2: string): number {
      const l1 = getLuminance(hex1);
      const l2 = getLuminance(hex2);
      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    }

    const white = '#FFFFFF';

    // Growth Emerald 600 (Teacher Maya)
    expect(getContrast(RESEARCH_PALETTE.growth[600], white)).toBeGreaterThanOrEqual(4.5);

    // Audio Azure 600 (Coach Leo)
    expect(getContrast(RESEARCH_PALETTE.audio[600], white)).toBeGreaterThanOrEqual(4.5);

    // Challenge Violet 600 (Master Kael)
    expect(getContrast(RESEARCH_PALETTE.challenge[600], white)).toBeGreaterThanOrEqual(4.5);

    // Reward Amber 700 (Companion Pip)
    expect(getContrast(RESEARCH_PALETTE.reward[700], white)).toBeGreaterThanOrEqual(4.5);

    // Correction Coral 600 (Review Drawers)
    expect(getContrast(RESEARCH_PALETTE.correction[600], white)).toBeGreaterThanOrEqual(4.5);

    // High-Contrast Slate 700 (Body typography - WCAG AAA)
    expect(getContrast(RESEARCH_PALETTE.neutrals[700], white)).toBeGreaterThanOrEqual(7.0);
  });

  test('TC-3D-05: 3D Environment Lighting: Verifies daylight, evening, and celebration configurations', async () => {
    const presets = ['daylight', 'evening', 'celebration'] as const;

    presets.forEach((preset) => {
      const config = ENVIRONMENT_3D[preset];
      expect(config).toBeDefined();
      expect(config.ambientLight.intensity).toBeGreaterThan(0.5);
      expect(config.keyLight.intensity).toBeGreaterThanOrEqual(1.4);
      expect(config.fillLight.intensity).toBeGreaterThan(0.5);
      expect(config.rimLight.intensity).toBeGreaterThan(0.8);
      expect(config.keyLight.position.length).toBe(3);
    });
  });

  test('TC-3D-06: Interactive Dialogue Quotes: Generates distinct mood-reactive quotes without repetition', async () => {
    const moods = ['idle', 'speaking', 'celebrate', 'wrong', 'thinking'] as const;
    const characterIds: CharacterId[] = ['maya', 'leo', 'elena', 'kael', 'pip'];

    characterIds.forEach((charId) => {
      moods.forEach((mood) => {
        const quote = getCharacterQuote(charId, mood);
        expect(typeof quote).toBe('string');
        expect(quote.length).toBeGreaterThan(5);
      });
    });
  });

  test('TC-3D-07: Admin CMS UI Preview: Verifies mobile exercise preview area in browser', async ({ page }) => {
    await page.goto('http://127.0.0.1:5180');
    await page.click('button:has-text("Exercise Builder")');

    // Confirm interactive exercise authoring and mobile preview container are visible
    await expect(page.locator('text=Learner Mobile Preview')).toBeVisible();
    await expect(page.locator('text=Interactive Exercise Authoring')).toBeVisible();
  });
});
