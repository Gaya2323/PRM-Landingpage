import { test, expect } from '@playwright/test';
import { LandingPage } from './pages/LandingPage';

test.describe('Explore section', () => {
    let landingPage: LandingPage;
    
    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page);
        await landingPage.goto();
    });

    test('visar rubriken', async () => {
        await expect(landingPage.exploreSection.locator('h2')).toHaveText('Explore product areas');
    });

    test('visar fyra produktkort', async () => {
        await expect(landingPage.exploreCards).toHaveCount(4)
    });

    test('varje kort har korrekt rubrik och beskrivning', async () => {
        const expectedCards = [
            { hrefLabel: 'Explore parcel products', heading: 'Parcel products', text: 'Domestic and international parcel services.' },
            { hrefLabel: 'Explore letter products', heading: 'Letter products', text: 'Mail products and related services.' },
            { hrefLabel: 'Explore logistics',        heading: 'Logistics',       text: 'Transport and logistics solutions.' },
            { hrefLabel: 'Explore add-ons',          heading: 'Add-on products', text: 'Additional services and product enhancements.' },
        ]

        for (const { hrefLabel, heading, text } of expectedCards) {
            await expect(
                landingPage.exploreSection.locator(`pn-card[href-label="${hrefLabel}"]`)
            ).toHaveCount(1)

            await expect(
                landingPage.exploreSection.locator(`pn-card[href-label="${hrefLabel}"] h3.pn-card-label`)
            ).toHaveText(heading)

            await expect(
                landingPage.exploreSection.locator(`pn-card[href-label="${hrefLabel}"] p.pn-card-section-paragraph`)
            ).toHaveText(text)
        }
    })

    test('varje kort har en bild med korrekt alt-text', async () => {
        const altTexts = ['Parcel products', 'Letter products', 'Logistics', 'Add-on products']
        for (const alt of altTexts) {
            await expect(landingPage.exploreSection.getByAltText(alt)).toBeVisible()
        }
    })

  

    // ── Navigations-tester ──────────────────────────────────────────

    test('klick på Parcel-kortet navigerar till Product Configuration', async ({ page }) => {
        await landingPage.exploreSection.locator('div.explore-cards > div').nth(0).click()
        await expect(page).toHaveURL(/\/product-configuration/)
    })

    test('klick på Letter-kortet navigerar till Product Configuration', async ({ page }) => {
        await landingPage.exploreSection.locator('div.explore-cards > div').nth(1).click()
        await expect(page).toHaveURL(/\/product-configuration/)
    })

    test('klick på Logistics-kortet navigerar till Product Configuration', async ({ page }) => {
        await landingPage.exploreSection.locator('div.explore-cards > div').nth(2).click()
        await expect(page).toHaveURL(/\/product-configuration/)
    })
})