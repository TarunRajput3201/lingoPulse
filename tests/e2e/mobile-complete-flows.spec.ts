import { test, expect, Page } from '@playwright/test';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const DIST_DIR = path.resolve(__dirname, '../../mobile/dist');

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

let server: http.Server | null = null;
let BASE_URL = 'http://127.0.0.1:18081';

test.beforeAll(async () => {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(`Expo web dist folder not found at ${DIST_DIR}. Run expo export --platform web --output-dir dist first.`);
  }

  server = http.createServer((req, res) => {
    const urlPath = (req.url || '/').split('?')[0];
    let filePath = path.join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath);

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      const htmlCandidate = `${filePath}.html`;
      if (fs.existsSync(htmlCandidate)) {
        filePath = htmlCandidate;
      } else {
        filePath = path.join(DIST_DIR, 'index.html');
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });

  await new Promise<void>((resolve) => {
    server!.listen(0, '127.0.0.1', () => {
      const addr = server!.address() as any;
      BASE_URL = `http://127.0.0.1:${addr.port}`;
      resolve();
    });
  });
});

test.afterAll(async () => {
  if (server) {
    await new Promise<void>((resolve) => server!.close(() => resolve()));
  }
});

async function attachErrorCollectors(page: Page) {
  const pageErrors: string[] = [];
  const threeDeprecationWarnings: string[] = [];
  page.on('pageerror', (err) => pageErrors.push(err.message));
  page.on('console', (msg) => {
    const txt = msg.text();
    if (
      txt.includes('THREE.Clock: This module has been deprecated') ||
      txt.includes('PCFSoftShadowMap has been removed')
    ) {
      threeDeprecationWarnings.push(txt);
    }
  });
  return { pageErrors, threeDeprecationWarnings };
}

test.describe('LingoPulse Complete Mobile App E2E Flows (Zero-Guessing Real Browser Suite)', () => {
  test('FLOW-01: Fresh Guest Boot, 3D Character Render & Zero Three.js Deprecation Warnings', async ({ page }) => {
    const { pageErrors, threeDeprecationWarnings } = await attachErrorCollectors(page);
    await page.setViewportSize({ width: 412, height: 915 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // Should show Welcome back banner + Unit 1 + Start button + Guest 10 hearts
    await expect(page.getByText(/Welcome back/i).first()).toBeVisible();
    await expect(page.getByText(/Unit 1:/i).first()).toBeVisible();
    await expect(page.getByText('Start →').first()).toBeVisible();
    await expect(page.getByLabel(/10 of 10 hearts/i).first()).toBeVisible();

    // Verify genuine 3D WebGL canvas renders with non-zero bounding box
    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeVisible();
    const box = await canvas.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(80);
    expect(box!.height).toBeGreaterThanOrEqual(80);

    expect(pageErrors).toEqual([]);
    expect(threeDeprecationWarnings).toEqual([]);
  });

  test('FLOW-02: Language Course Switch to French & French Character Localization', async ({ page }) => {
    const { pageErrors } = await attachErrorCollectors(page);
    await page.setViewportSize({ width: 412, height: 915 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Navigate to Courses tab
    await page.getByText('Courses', { exact: true }).last().click();
    await page.waitForTimeout(800);
    await expect(page.getByText('Language Courses', { exact: true })).toBeVisible();
    await expect(page.getByText('All (38)', { exact: true })).toBeVisible();

    // Search & Select French Academy
    await page.getByPlaceholder(/Search language/i).fill('French');
    await page.waitForTimeout(300);
    await page.getByText('French Academy', { exact: true }).first().click();
    await page.waitForTimeout(1200);

    // Back on Home tab with French active
    await expect(page.getByRole('button', { name: 'Change learning language' }).getByText('🇫🇷')).toBeVisible();
    await expect(page.locator(':text-matches("First Steps & Greetings", "i"):visible').first()).toBeVisible();

    // Open Practice Hub -> verify Pip greets in French
    await page.getByText('Practice', { exact: true }).last().click();
    await page.waitForTimeout(1000);
    await expect(page.getByText(/Votre mémoire est excellente/i)).toBeVisible();
    const pipCanvas = page.locator('canvas').last();
    await expect(pipCanvas).toBeVisible();

    expect(pageErrors).toEqual([]);
  });

  test('FLOW-03: All 5 Real-Time 3D Characters Switch cleanly on Profile Tab', async ({ page }) => {
    const { pageErrors, threeDeprecationWarnings } = await attachErrorCollectors(page);
    await page.setViewportSize({ width: 412, height: 915 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    await page.getByText('Profile', { exact: true }).last().click();
    await page.waitForTimeout(1000);

    const expectedRoles: Record<string, RegExp> = {
      Maya: /Grammar & Vocabulary Guide/i,
      Leo: /Phonics & Speech Coach/i,
      Elena: /Dialogue & Sentence Specialist/i,
      Kael: /Speed & Mastery Strategist/i,
      Pip: /Habit & Cheer Bot/i,
    };

    for (const [name, roleRegex] of Object.entries(expectedRoles)) {
      await page.getByText(name, { exact: true }).first().click();
      await page.waitForTimeout(500);
      await expect(page.getByText(roleRegex).first()).toBeVisible();
      const canvas = page.locator('canvas').last();
      await expect(canvas).toBeVisible();
      const box = await canvas.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(130);
    }

    expect(pageErrors).toEqual([]);
    expect(threeDeprecationWarnings).toEqual([]);
  });

  test('FLOW-04: Clicking Start on New Challenge -> Intro Modal -> Full French Lesson & Speaking Silence Guard', async ({ page }) => {
    test.setTimeout(90000);
    const { pageErrors } = await attachErrorCollectors(page);
    await page.setViewportSize({ width: 412, height: 915 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Switch to French first
    await page.getByText('Courses', { exact: true }).last().click();
    await page.waitForTimeout(600);
    await page.getByText('French Academy', { exact: true }).first().click();
    await page.waitForTimeout(1000);

    // Click Start -> CharacterIntroModal
    await page.getByText('Start →').first().click();
    await page.waitForTimeout(800);
    await expect(page.getByText(/Bonjour!/i).first()).toBeVisible();
    await expect(page.getByText(/Je suis Maya, votre guide/i).first()).toBeVisible();

    // Click LET'S GO! -> Lesson screen MUST load without GlobalErrorBoundary ("Something went wrong")
    await page.getByText(/Let's Go/i).first().click();
    await page.waitForTimeout(1500);
    await expect(page).toHaveURL(/\/lesson\/lesson-fr-/);
    await expect(page.getByText(/Something went wrong/i)).toHaveCount(0);
    await expect(page.getByText('French Academy', { exact: true }).last()).toBeVisible();

    // Verify 3D companion renders inside lesson
    await expect(page.locator('canvas').last()).toBeVisible();

    // Answer Q1 (Multiple Choice: "Hello" -> "Bonjour") and click audio listen button
    await expect(page.getByText(/Select the correct French word for "Hello"/i)).toBeVisible();
    const q1Listen = page.getByRole('button', { name: /Listen|Play audio/i }).first();
    if (await q1Listen.isVisible().catch(() => false)) {
      await q1Listen.click();
    }
    await page.getByText('Bonjour', { exact: true }).first().click();
    await page.getByText(/^Check$/i).first().click();
    await page.waitForTimeout(500);
    await expect(page.getByText(/Excellent!|Awesome!|Correct!/i).first()).toBeVisible();
    await page.getByText(/^Continue$/i).first().click();
    await page.waitForTimeout(450);

    // Advance through exercises & verify Speaking Silence Guard
    let sawSpeakingExercise = false;
    for (let step = 2; step <= 15; step++) {
      await expect(page.getByText(/Something went wrong/i)).toHaveCount(0);

      const listenBtn = page.getByRole('button', { name: /Listen|Play audio/i }).first();
      if (await listenBtn.isVisible().catch(() => false)) {
        await listenBtn.click().catch(() => {});
      }

      const isSpeaking = await page.getByText(/Tap the microphone and speak aloud/i).isVisible().catch(() => false);
      if (isSpeaking) {
        sawSpeakingExercise = true;
        // CRITICAL: Without speaking into mic, Check button MUST remain disabled and NEVER report success!
        const checkBtn = page.getByRole('button', { name: /^Check$/i }).first();
        const isDisabled = await checkBtn.getAttribute('aria-disabled');
        expect(isDisabled).toBe('true');

        // Tap mic button in headless Chromium (no mic stream or silence) -> must NOT mark spoken answer valid!
        const micBtn = page.getByRole('button', { name: /Tap to speak/i }).first();
        if (await micBtn.isVisible().catch(() => false)) {
          await micBtn.click();
          await page.waitForTimeout(450);
          const stopBtn = page.getByRole('button', { name: /Stop recording/i }).first();
          if (await stopBtn.isVisible().catch(() => false)) {
            await stopBtn.click();
            await page.waitForTimeout(400);
          }
          await expect(page.getByText(/Great pronunciation|Fantastic accent/i)).toHaveCount(0);
          const stillDisabled = await checkBtn.getAttribute('aria-disabled');
          expect(stillDisabled).toBe('true');
        }
        break;
      }

      const isMatching = await page.getByText(/^Match the/i).isVisible().catch(() => false);
      const wordOpt = page.locator('[role="button"][aria-label^="Word option:"]:visible').first();
      const radioOpt = page.locator('[role="radio"]:visible').first();
      const opt1 = page.locator('[role="button"]:visible').filter({ hasText: /^1/ }).first();
      const textInput = page.locator('input:visible, textarea:visible').first();
      const trueBtn = page.locator(':text-matches("^True$", "i"):visible').first();

      if (isMatching) {
        const pairDict: Record<string, string> = {
          Bonjour: 'Hello',
          'Au revoir': 'Goodbye',
          Merci: 'Thank you',
          "S'il vous plaît": 'Please',
          'Excusez-moi': 'Excuse me',
          Oui: 'Yes',
          Non: 'No',
          Enchanté: 'Nice to meet you',
        };
        for (const [fr, en] of Object.entries(pairDict)) {
          const leftBtn = page.locator(`[role="button"][aria-label="${fr}"]:visible`).first();
          const rightBtn = page.locator(`[role="button"][aria-label="${en}"]:visible`).first();
          if ((await leftBtn.isVisible().catch(() => false)) && (await rightBtn.isVisible().catch(() => false))) {
            await leftBtn.click({ timeout: 3000 });
            await rightBtn.click({ timeout: 3000 });
            await page.waitForTimeout(120);
          }
        }
        // Fallback brute-force for any remaining unmatched cards
        const checkBtnNow = page.locator('[role="button"]:visible').filter({ hasText: /^Check$/i }).first();
        if ((await checkBtnNow.getAttribute('aria-disabled').catch(() => 'true')) === 'true') {
          const allMatchCards = page
            .locator('[role="button"]:visible')
            .filter({ hasNotText: /^(Check|Continue|Quit Session|Keep Learning)$/i });
          const total = await allMatchCards.count();
          const labels: string[] = [];
          for (let i = 0; i < total; i++) {
            const lbl = (await allMatchCards.nth(i).getAttribute('aria-label')) || '';
            if (lbl && !lbl.endsWith(' matched') && !lbl.includes('Quit') && !lbl.includes('companion')) {
              labels.push(lbl);
            }
          }
          const half = Math.floor(labels.length / 2);
          for (let l = 0; l < half; l++) {
            for (let r = half; r < labels.length; r++) {
              const lBtn = page.locator(`[role="button"][aria-label="${labels[l]}"]:visible`).first();
              const rBtn = page.locator(`[role="button"][aria-label="${labels[r]}"]:visible`).first();
              if (!(await lBtn.isVisible().catch(() => false)) || !(await rBtn.isVisible().catch(() => false))) {
                continue;
              }
              await lBtn.click({ timeout: 2000 }).catch(() => {});
              await rBtn.click({ timeout: 2000 }).catch(() => {});
              await page.waitForTimeout(550);
              if (await lBtn.isHidden().catch(() => true)) break;
            }
          }
        }
      } else if (await wordOpt.isVisible().catch(() => false)) {
        await wordOpt.click({ timeout: 5000 });
      } else if (await radioOpt.isVisible().catch(() => false)) {
        await radioOpt.click({ timeout: 5000 });
      } else if (await opt1.isVisible().catch(() => false)) {
        await opt1.click({ timeout: 5000 });
      } else if (await textInput.isVisible().catch(() => false)) {
        await textInput.fill('Oui');
      } else if (await trueBtn.isVisible().catch(() => false)) {
        await trueBtn.click({ timeout: 5000 });
      } else {
        // WordOrder visible chips (exclude header Quit button, audio Listen, and footer Check/Continue)
        const chips = page
          .locator('[role="button"]:visible')
          .filter({ hasNotText: /^(Check|Continue|Quit Session|Keep Learning|Excellent!|Correct Solution:)$/i });
        const count = await chips.count();
        for (let c = 0; c < count; c++) {
          const el = chips.nth(c);
          const aria = (await el.getAttribute('aria-label')) || '';
          const txt = ((await el.textContent()) || '').trim();
          if (
            aria.includes('Quit lesson') ||
            aria.includes('Listen') ||
            aria.includes('Play') ||
            aria.includes('companion') ||
            txt.length === 0
          ) {
            continue;
          }
          await el.click({ timeout: 3000 }).catch(() => {});
          const checkNow = page.locator('[role="button"]:visible').filter({ hasText: /^Check$/i }).first();
          const dis = await checkNow.getAttribute('aria-disabled').catch(() => 'true');
          if (dis !== 'true') break;
        }
      }

      const checkBtn = page.locator('[role="button"]:visible').filter({ hasText: /^Check$/i }).first();
      if (await checkBtn.isVisible().catch(() => false)) {
        const dis = await checkBtn.getAttribute('aria-disabled').catch(() => null);
        if (dis === 'true') {
          throw new Error(`Check button stayed disabled on lesson step ${step}`);
        }
        await checkBtn.click({ timeout: 5000 });
        await page.waitForTimeout(400);
      }
      const contBtn = page.locator('[role="button"]:visible').filter({ hasText: /^Continue$/i }).first();
      if (await contBtn.isVisible().catch(() => false)) {
        await contBtn.click({ timeout: 5000 });
        await page.waitForTimeout(350);
      } else {
        break;
      }
    }

    expect(sawSpeakingExercise).toBe(true);
    expect(pageErrors).toEqual([]);
  });

  test('FLOW-05: Header Hearts Modal, Leagues Podium & Auth/Onboarding Navigation', async ({ page }) => {
    const { pageErrors } = await attachErrorCollectors(page);
    await page.setViewportSize({ width: 412, height: 915 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // 1. Open Hearts Modal from Header
    await page.getByRole('button', { name: /hearts\. Tap to view/i }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Hearts & Lives')).toBeVisible();
    await page.getByRole('button', { name: /Close hearts modal/i }).click();
    await page.waitForTimeout(400);

    // 2. Leagues Tab
    await page.getByText('Leagues', { exact: true }).last().click();
    await page.waitForTimeout(700);
    await expect(page.getByText('Gold League')).toBeVisible();
    await expect(page.getByText('Elena Rostova')).toBeVisible();

    // 3. Direct Register -> Login -> Onboarding Flow
    await page.goto(`${BASE_URL}/register`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(700);
    await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();

    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(700);
    await expect(page.getByRole('button', { name: 'Use Demo Account' })).toBeVisible();

    await page.goto(`${BASE_URL}/onboarding`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(700);
    await expect(page.getByText('Choose Your Language')).toBeVisible();
    await page.getByText('French').first().click();
    await page.getByText(/Start Learning/i).first().click();
    await page.waitForTimeout(400);
    await expect(page.getByText(/Step 2 of 3/i)).toBeVisible();
    await page.getByText(/Next Step/i).first().click();
    await page.waitForTimeout(400);
    await expect(page.getByText(/Step 3 of 3/i)).toBeVisible();
    await expect(page.getByText(/Complete & Begin/i).first()).toBeVisible();

    expect(pageErrors).toEqual([]);
  });

  test('FLOW-06: Stepping-Stone Lesson Node Tap, Wrong Answer Heart Deduction & Practice Hub Recovery', async ({ page }) => {
    const { pageErrors } = await attachErrorCollectors(page);
    await page.setViewportSize({ width: 412, height: 915 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Tap the active stepping-stone Lesson Node on the path
    await page.getByRole('button', { name: /First Steps & Greetings.*Available/i }).first().click();
    await page.waitForTimeout(700);
    await expect(page.getByText(/Let's Go/i).first()).toBeVisible();
    await page.getByText(/Let's Go/i).first().click();
    await page.waitForTimeout(1200);

    // Deliberately choose the wrong answer ("¿Cómo estás?" for "Hello")
    await page.getByText('¿Cómo estás?', { exact: true }).first().click();
    await page.getByText(/^Check$/i).first().click();
    await page.waitForTimeout(600);
    await expect(page.getByText(/Correct Solution:/i).first()).toBeVisible();

    // Exit Lesson via close button -> confirm Quit Session
    await page.getByRole('button', { name: /Quit lesson/i }).click();
    await page.waitForTimeout(400);
    await page.getByText(/Quit Session/i).last().click();
    await page.waitForTimeout(1000);

    // Verify heart dropped from 10 -> 9
    await expect(page.locator('[aria-label*="9 of 10 hearts"]:visible').first()).toBeVisible();

    // Open Practice Hub -> verify Mistake appears -> Complete Practice Drill -> Heart restored to 10!
    await page.getByText('Practice', { exact: true }).last().click();
    await page.waitForTimeout(800);
    await expect(page.getByText(/Start Practice Drill/i)).toBeVisible();
    await page.getByText(/Start Practice Drill/i).click();
    await page.waitForTimeout(400);
    await page.getByText('Reveal Solution', { exact: true }).click();
    await page.waitForTimeout(300);
    await page.getByText('Finish & Refill Heart', { exact: true }).click();
    await page.waitForTimeout(800);

    // Heart recovered back to 10!
    await expect(page.locator('[aria-label*="10 of 10 hearts"]:visible').first()).toBeVisible();
    expect(pageErrors).toEqual([]);
  });
});
