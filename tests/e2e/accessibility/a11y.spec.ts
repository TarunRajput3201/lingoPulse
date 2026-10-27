import { test, expect } from '@playwright/test';

test.describe('Accessibility & Semantic Markup Suite', () => {
  const adminUrl = 'http://localhost:5180';

  test('TC-A11Y-01: Verifies semantic landmark elements (<aside>, <nav>, <main>) are properly defined', async ({ page }) => {
    await page.goto(adminUrl);

    // Check landmark elements exist
    const aside = page.locator('aside');
    await expect(aside).toBeVisible();

    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('TC-A11Y-02: Verifies all sidebar navigation items are interactive buttons with accessible names', async ({ page }) => {
    await page.goto(adminUrl);

    const navButtons = page.locator('nav button');
    const count = await navButtons.count();
    expect(count).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < count; i++) {
      const button = navButtons.nth(i);
      const accessibleName = await button.textContent();
      expect(accessibleName?.trim().length).toBeGreaterThan(0);
    }
  });

  test('TC-A11Y-03: Verifies form controls in Exercise Builder are accompanied by visible label descriptors', async ({ page }) => {
    await page.goto(adminUrl);
    await page.click('button:has-text("Exercise Builder")');

    // Exercise type label
    await expect(page.locator('label:has-text("Exercise Type")')).toBeVisible();

    // Prompt label
    await expect(page.locator('label:has-text("Question Prompt / Sentence")')).toBeVisible();

    // Contextual hint label
    await expect(page.locator('label:has-text("Contextual Hint")')).toBeVisible();
  });
});
