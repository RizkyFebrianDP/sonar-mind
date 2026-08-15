import { test, expect } from '@playwright/test';

test.describe('Results Flow', () => {
  test('should render results page and handle empty state', async ({ page }) => {
    await page.goto('/results');

    // Wait for the loading state to disappear if any
    await expect(page.locator('text=Memuat hasil assessment...')).not.toBeVisible({ timeout: 10000 });

    // Assuming a fresh test environment, there might be no results,
    // so it should show "Belum Ada Hasil". If there are results, it shows "Assessment Report".
    const emptyState = page.locator('text=Belum Ada Hasil');
    const hasData = page.locator('text=Assessment Report');

    // Check which state is visible
    await expect(emptyState.or(hasData)).toBeVisible();

    if (await emptyState.isVisible()) {
      await expect(page.getByRole('link', { name: /Mulai Assessment/i })).toBeVisible();
    } else {
      await expect(page.locator('text=Overall')).toBeVisible();
      await expect(page.locator('text=Detail Per Modul')).toBeVisible();
    }
  });
});
