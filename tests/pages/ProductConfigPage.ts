
import { Page, Locator } from '@playwright/test';

export class ProductConfigPage {
    readonly page: Page;
    readonly wrapper: Locator;
    readonly categoryFilter: Locator;
    readonly issuerFilter: Locator;
    readonly originFilter: Locator;
    readonly destinationFilter: Locator;
    readonly tableSection: Locator;
    readonly tableRows: Locator;
    


    constructor(page: Page){
        this.page = page;
        this.wrapper = page.getByTestId('prm-view-product-configuration');
        this.categoryFilter = page.locator('#filter-product-category');
        this.issuerFilter = page.locator('#issuer-area');
        this.originFilter = page.locator('#origin-country-area');
        this.destinationFilter = page.locator('#destination-country-area');
        this.tableSection = page.getByTestId('product-group').first();
        this.tableRows = page.locator('.config-product-table tbody tr');

    }

    async goto(){
         await this.page.goto('/#/product-configuration');
    }

    //väljer ett värde via JS direkt på pn-multiselect (kringgå shadow DOM)
    async selectFilterOption(filterId: string, value: string) {
        await this.page.evaluate(({ id, val }) => {
            const el = document.querySelector(`#${id}`) as any;
            if (!el?.options) return;
            el.options.forEach((o: any) => {
                if (o.value === val) {
                    o.checked = true;
                }
            });
        }, { id: filterId, val: value });

        // Vänta aktivt tills polling-loopen reagerat och Vue uppdaterat DOM
        await this.page.waitForFunction(() => {
            const rows = document.querySelectorAll('.config-product-table tbody tr');
            return rows.length > 0; // bara bekräfta att tabellen finns
        }, { timeout: 5000 });
    }

    async getRowCount(): Promise<number> {
        return await this.tableRows.count();
    }


}
