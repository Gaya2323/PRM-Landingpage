
import { test, expect } from '@playwright/test';

test('startsidan laddas och visar rubriken', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page).toHaveTitle(/Vue|PRM-Landingpage/);
})