import {expect, Locator, Page} from "@playwright/test";
import {NOTIFICATIONS} from "../../data/notifications.data";


export abstract class SalesPortalPage {
    spinner: Locator;
    notification: Locator
    abstract uniqueElement: Locator;

    constructor(protected page: Page) {
        this.spinner = page.locator('.spinner-border');
        this.notification = page.locator('.toast-body');
    }

    async waitForOpened() {
        await this.page.waitForTimeout(5000);
        await expect(this.uniqueElement).toBeVisible();
    }

    async waitForSpinner(){
        await expect(this.spinner).toHaveCount(0);
    }

    async waitForNotification(text: string){
        await expect(this.notification).toHaveText(text);
    }
}