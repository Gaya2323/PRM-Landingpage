
import { test, expect } from '@playwright/test';
import { LandingPage } from './pages/LandingPage';

test.describe('Landing page', () => {
    let landingPage: LandingPage;

    test.beforeEach( async ({ page }) => {
        landingPage = new LandingPage(page);
        await landingPage.goto();
    });

    test('sidan laddas', async() => {
        await expect(landingPage.container).toBeVisible();
    });

    test('alla sektioner renderas i rätt ordning', async({ page }) => {
        
        await expect(landingPage.heroSection).toBeVisible();
        await expect(landingPage.exploreSection).toBeVisible();
        await expect(landingPage.newToPrmTitle).toBeVisible();
        await expect(landingPage.faqSection).toBeVisible();

        //control the DOM-order: Hero section render before others
        const heroBox = await landingPage.heroSection.boundingBox();
        const exploreBox = await landingPage.exploreSection.boundingBox();
        expect(heroBox!.y).toBeLessThan(exploreBox!.y);
    });

});