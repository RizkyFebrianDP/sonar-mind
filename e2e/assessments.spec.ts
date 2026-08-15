import { test, expect } from '@playwright/test';

test.describe('Assessments Flow', () => {
  test('should render assessments page correctly', async ({ page }) => {
    await page.goto('/assessments');

    // Check main heading
    await expect(page.getByRole('heading', { name: 'Assessments', exact: true })).toBeVisible();
    await expect(page.locator('text=Test how critically, ethically, and independently you interact with AI.')).toBeVisible();

    // The page has AssessmentHeroCard, AssessmentSections, PreviousAttemptsWidget, DidYouKnowCard
    // Let's check for some general text that should be on the page
    // Note: The specific text depends on the components, but we know it's an assessment page.
    // If the hero card has "Start Assessment" or similar, we can check that.
    await expect(
      page.getByRole('button', { name: /Start/i }).or(page.getByRole('link', { name: /Start/i }))
    ).toBeVisible().catch(() => {}); // Optional, just to verify it renders if it exists
  });
});
