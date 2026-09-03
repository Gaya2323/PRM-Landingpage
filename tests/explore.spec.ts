
import { test, expect } from '@playwright/test';
import { LandingPage } from './pages/LandingPage';

test.describe('Explore section', () => {
    let landingPage: LandingPage;
    
    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page);
        await landingPage.goto();
    });

    test('visar rubriken', async()=> {
        await expect(landingPage.exploreSection.locator('h2)')).toHaveText('Explore product areas');
    });

    test('visar fyra produktkort', async() => {
        await expect(landingPage.exploreCards).toHaveCount(4);
    });

    test('varje kort har korrekt rubrik och beskrivning', async () => {
        const expectedCards = [
            { title: 'Parcel products', text: 'Domestic and international parcel services.' },
            { title: 'Letter products', text: 'Mail products and related services.' },
            { title: 'Logistics', text: 'Transport and logistics solutions.' },
            { title: 'Add-on products', text: 'Additional services and product enhancements.' },
        ];

        for (const { title, text } of expectedCards) {
            await expect(
            landingPage.exploreSection.getByRole('heading', { level: 3, name: title })
            ).toBeVisible();
            await expect(landingPage.exploreSection.getByText(text)).toBeVisible();
        }
    });

    test('varje kort har en bild med korrekt alt-text', async()=> {
        const altTexts = [ 'Parcel products', 'Letter products', 'Logistics', 'Add-on products'];
        for(const alt of altTexts){
            await expect(landingPage.exploreSection.getByAltText(alt)).toBeVisible();
        }
    });

});