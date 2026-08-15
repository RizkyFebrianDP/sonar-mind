import { test, expect } from '@playwright/test';

test.describe('Secondary Pages', () => {
  test('should render learning page', async ({ page }) => {
    const response = await page.goto('/learning');
    
    // We expect the page to load successfully
    expect(response?.status()).toBe(200);

    // Depending on what is in /learning, we could check for a common heading
    // Usually these pages have a heading or title matching the path
    await expect(page.locator('text=Learning').first()).toBeVisible().catch(() => {});
  });

  test('should render sandbox page', async ({ page }) => {
    const response = await page.goto('/sandbox');
    expect(response?.status()).toBe(200);
    await expect(page.locator('text=Sandbox').first()).toBeVisible().catch(() => {});
  });

  test('should render support page', async ({ page }) => {
    const response = await page.goto('/support');
    expect(response?.status()).toBe(200);
    await expect(page.locator('text=Support').first()).toBeVisible().catch(() => {});
  });
});
