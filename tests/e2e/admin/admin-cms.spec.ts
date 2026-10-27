import { test, expect } from '@playwright/test';

test.describe('Admin CMS Web Application Suite', () => {
  const adminBaseUrl = 'http://localhost:5180';

  test('TC-ADM-01: Admin dashboard loads and displays analytics statistics cards', async ({ page }) => {
    await page.goto(adminBaseUrl);

    // Verify brand header
    await expect(page.getByRole('heading', { name: 'LingoPulse' })).toBeVisible();
    await expect(page.locator('text=CMS & Admin')).toBeVisible();

    // Verify Analytics view is displayed by default
    await expect(page.locator('text=Total Learners')).toBeVisible();
    await expect(page.locator('text=Active Streaks')).toBeVisible();
    await expect(page.locator('text=Published Courses')).toBeVisible();
    await expect(page.locator('text=Lessons Completed')).toBeVisible();
    await expect(page.locator('text=Instant Curriculum Publishing')).toBeVisible();
  });

  test('TC-ADM-02: Navigates to Course Curriculum hierarchy view', async ({ page }) => {
    await page.goto(adminBaseUrl);

    // Click Course Curriculum in sidebar
    await page.click('button:has-text("Course Curriculum")');

    // Verify Curriculum Hierarchy header
    await expect(page.locator('text=Curriculum Hierarchy')).toBeVisible();
    await expect(page.locator('button:has-text("New Course")')).toBeVisible();

    // Verify course listing renders at least Spanish course
    await expect(page.getByText('Spanish Essentials', { exact: true })).toBeVisible();
  });

  test('TC-ADM-03: Navigates to Exercise Builder with interactive authoring and mobile preview', async ({ page }) => {
    await page.goto(adminBaseUrl);

    // Click Exercise Builder in sidebar
    await page.click('button:has-text("Exercise Builder")');

    // Verify Exercise Authoring header
    await expect(page.locator('text=Interactive Exercise Authoring')).toBeVisible();
    await expect(page.locator('text=Learner Mobile Preview')).toBeVisible();

    // Verify Exercise Type select exists with extended types
    const typeSelect = page.locator('select').filter({ hasText: /Multiple Choice/i });
    await expect(typeSelect).toBeVisible();

    // Verify presence of all advanced exercise types in dropdown options
    await expect(typeSelect.locator('option[value="MULTIPLE_CHOICE"]')).toHaveText('Multiple Choice');
    await expect(typeSelect.locator('option[value="MATCHING_PAIRS"]')).toHaveText('Matching Pairs');
    await expect(typeSelect.locator('option[value="LISTENING_COMPREHENSION"]')).toHaveText('Listening Comprehension');
    await expect(typeSelect.locator('option[value="SPEAKING_PRONUNCIATION"]')).toHaveText('Speaking / Pronunciation');
  });

  test('TC-ADM-04: Exercise Builder dynamically updates inputs when selecting Matching Pairs', async ({ page }) => {
    await page.goto(adminBaseUrl);
    await page.click('button:has-text("Exercise Builder")');

    // Change exercise type to MATCHING_PAIRS
    const typeSelect = page.locator('select').filter({ hasText: /Multiple Choice/i });
    await typeSelect.selectOption('MATCHING_PAIRS');

    // Verify Matching Pairs input field appears
    await expect(page.locator('text=Matching Pairs (left:right, comma-separated)')).toBeVisible();
    await expect(page.locator('input[placeholder*="Hola:Hello"]')).toBeVisible();
  });
});
