
import { test, expect } from '@playwright/test';
import { LandingPage } from './pages/LandingPage';
import { ProductConfigPage } from './pages/ProductConfigPage';



test.describe('Product Configuration', () => {

    test('Parcel products-kort navigerar till Product Configuration', async ({ page}) => {
        const landing = new LandingPage(page);
        await landing.goto();
        await page.getByTestId('card-parcel').click();
        await expect(page).toHaveURL(/.*product-configuration/);
    });

    test('Letter products-kort navigerar till Product Configuration', async ({ page}) => {
        const landing = new LandingPage(page);
        await landing.goto();
        await page.getByTestId('card-letter').click();
        await expect(page).toHaveURL(/.*product-configuration/);
    });

    test('Logistics-kort navigerar till Product Configuration', async ({ page}) => {
        const landing = new LandingPage(page);
        await landing.goto();
        await page.getByTestId('card-logistics').click();
        await expect(page).toHaveURL(/.*product-configuration/);
    });

    //Testa Filter  och Tabeller synkas tillsamans
    test.describe('Filter section', ()=> {
        let configPage: ProductConfigPage;

        test.beforeEach(async ({ page }) => {
            configPage = new ProductConfigPage(page);
            await configPage.goto();

            // Vänta på att Vue-appen är redo
            await configPage.wrapper.waitFor({ timeout: 10000 });

            // Vänta på att API-data laddats och tabellen renderas
            await page.waitForFunction(() => {
                return document.querySelectorAll('.config-product-table tbody tr').length > 0
            }, { timeout: 20000 });
            
        });

        test('alla 4 filter renderas', async() => {
            await expect(configPage.categoryFilter).toBeVisible();
            await expect(configPage.issuerFilter).toBeVisible();
            await expect(configPage.originFilter).toBeVisible();
            await expect(configPage.destinationFilter).toBeVisible();
        });

       test('category-filter uppdaterar tabellen', async () => {
            const rowsBefore = await configPage.getRowCount();

            await configPage.selectFilterOption('filter-product-category', 'Parcel');

            // Vänta på att polling-loopen reagerar och tabellen uppdateras
            await configPage.page.waitForTimeout(600);

            const rowsAfter = await configPage.getRowCount();

            // Tabellen ska ha uppdaterats (färre eller lika rader)
            expect(rowsAfter).toBeLessThanOrEqual(rowsBefore);
            // Minst en rad ska finnas kvar
            expect(rowsAfter).toBeGreaterThan(0);
        });

        test('issuer-filter uppdaterar tabellen', async () => {
            const rowsBefore = await configPage.getRowCount();

            const firstIssuer = await configPage.tableRows
                .first()
                .locator('td.config-col-issuer')
                .textContent();

            await configPage.selectFilterOption('issuer-area', firstIssuer!.trim());

            // Vänta tills radantalet faktiskt ändras
            await configPage.page.waitForFunction(
                (before) => document.querySelectorAll('.config-product-table tbody tr').length !== before,
                rowsBefore,
                { timeout: 5000 }
            );

            const rowsAfter = await configPage.getRowCount();
            expect(rowsAfter).toBeLessThan(rowsBefore);
            expect(rowsAfter).toBeGreaterThan(0);
        });
    });

});
       

