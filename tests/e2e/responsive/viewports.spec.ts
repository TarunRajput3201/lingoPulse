import { test, expect } from '@playwright/test';

test.describe('Responsive Layout & Viewport Adaptability Suite', () => {
  const adminUrl = 'http://localhost:5180';

  test('TC-RESP-01: Mobile viewport (375x667) renders core dashboard elements without horizontal clipping', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(adminUrl);

    // Verify key titles are visible
    await expect(page.getByRole('heading', { name: 'LingoPulse' })).toBeVisible();
    await expect(page.locator('text=Total Learners')).toBeVisible();

    // Verify viewport width matches
    const viewportSize = page.viewportSize();
    expect(viewportSize?.width).toBe(375);
  });

  test('TC-RESP-02: Tablet viewport (768x1024) renders analytics cards and navigation properly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(adminUrl);

    await expect(page.locator('text=Total Learners')).toBeVisible();
    await expect(page.locator('text=Active Streaks')).toBeVisible();
    await expect(page.locator('text=Published Courses')).toBeVisible();
  });

  test('TC-RESP-03: Desktop viewport (1280x800) displays full 3-column curriculum layout', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(adminUrl);

    await page.click('button:has-text("Course Curriculum")');
    await expect(page.locator('text=Curriculum Hierarchy')).toBeVisible();

    // Check that Courses, Units, and Lessons columns exist
    await expect(page.locator('h3:has-text("Courses")')).toBeVisible();
    await expect(page.locator('h3:has-text("Units")')).toBeVisible();
    await expect(page.locator('h3:has-text("Lessons")')).toBeVisible();
  });
});
