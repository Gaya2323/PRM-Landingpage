
import { Page, Locator } from '@playwright/test';

export class LandingPage {
    readonly page: Page;
    readonly container: Locator;
    readonly heroSection: Locator;
    readonly exploreSection: Locator;
    readonly newToPrmTitle: Locator;
    readonly faqSection: Locator;
    readonly exploreCards: Locator;
    readonly viewAllButton: Locator;
    readonly learnHowPRMWorksButton: Locator;  
    
    //Learn how PRM works
    constructor(page: Page){
        this.page = page;
        this.container = page.getByTestId('landing-page');
        this.heroSection = page.getByTestId('hero-section');
        this.exploreSection = page.getByTestId('explore-section');
        this.newToPrmTitle = page.getByTestId('new-to-prm-title');
        this.faqSection = page.getByTestId('faq-section');
        this.exploreCards = this.exploreSection.locator('pn-card');
       this.viewAllButton = this.heroSection.getByTestId('view-all-products-btn');
        this.learnHowPRMWorksButton = this.heroSection.locator('pn-button[label="Learn how PRM works"]');
        
    }

    async goto(){
        await this.page.goto('/');
    }
    exploreCardByLabel(label: string): Locator {
        return this.exploreSection.locator(`pn-card[label="${label}"]`);
    }
    exploreLinkByLable(hrefLabel: string): Locator {
        return this.exploreSection.getByRole('link',{ name: hrefLabel});
    }
    async clickViewAllProducts(){
        await this.viewAllButton.click();
    }

}