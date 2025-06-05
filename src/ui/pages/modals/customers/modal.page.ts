import {SalesPortalPage} from "../../salesPortal.page";
import {expect} from "@playwright/test";

export abstract class Modal extends SalesPortalPage {
    async waitForClosed() {
        await expect(this.uniqueElement).not.toBeVisible();
    }
}