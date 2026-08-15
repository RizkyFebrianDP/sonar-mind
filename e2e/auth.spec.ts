import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should render login page correctly', async ({ page }) => {
    await page.goto('/login');

    // Verify main headings
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible();

    // Verify inputs
    await expect(page.getByPlaceholder('harshitlog@gmail.com')).toBeVisible();
    await expect(page.getByPlaceholder('•••••••••••••')).toBeVisible();
    
    // Switch to Sign In mode
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByRole('heading', { name: 'Sign In', exact: true })).toBeVisible();
  });

  test('should display error on invalid login', async ({ page }) => {
    await page.goto('/login');
    
    // Switch to Sign In mode
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Fill in invalid credentials
    await page.getByPlaceholder('harshitlog@gmail.com').fill('invalid@example.com');
    await page.getByPlaceholder('•••••••••••••').fill('wrongpassword123');
    
    // Submit
    await page.getByRole('button', { name: 'Masuk' }).click();

    // Expect an error message to be visible
    // Wait for the error message container (it uses framer-motion, so it will animate in)
    await expect(page.locator('text=Terjadi kesalahan. Silakan coba lagi.').or(page.locator('text=Invalid login credentials'))).toBeVisible({ timeout: 10000 });
  });
});
