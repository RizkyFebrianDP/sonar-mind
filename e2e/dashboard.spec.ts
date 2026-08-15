import { test, expect } from '@playwright/test';

test.describe('Dashboard Flow', () => {
  // We assume the user is either logged in or the dashboard is accessible without auth for this test.
  // If it requires auth, we would need a global setup to save the login state.
  // For now, we'll check the basic elements.
  
  test('should render dashboard components correctly', async ({ page }) => {
    await page.goto('/');

    // Check if the Welcome text is visible
    await expect(page.locator('text=Welcome back')).toBeVisible();

    // Check if the "Take Assessment" or "Retake Assessment" button exists
    await expect(
      page.getByRole('link', { name: /Take Assessment|Retake Assessment/i })
    ).toBeVisible();

    // Check if the Summary Cards container is visible
    await expect(page.locator('text=My Competencies')).toBeVisible();
    await expect(page.locator('text=Overall Competency')).toBeVisible();
    await expect(page.locator('text=Critical Evaluation')).toBeVisible();
    await expect(page.locator('text=Bias Awareness')).toBeVisible();
    await expect(page.locator('text=Ethical Reasoning')).toBeVisible();
  });
});
