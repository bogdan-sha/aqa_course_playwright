import { expect } from "@playwright/test";
import { Modal } from "./modal.page";

export class DeleteModal extends Modal {
    readonly uniqueElement = this.page.locator(`div[role="dialog"]`);

    readonly title = this.uniqueElement.locator('.modal-title');
    readonly closeButton = this.uniqueElement.locator('button[aria-label="Close"]');
    readonly cancelButton = this.uniqueElement.getByRole('button', { name: 'Cancel' });
    readonly deleteButton = this.uniqueElement.getByRole('button', { name: 'Yes, Delete' });

    async clickDelete() {
        await this.deleteButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async close() {
        await this.closeButton.click();
        await expect(this.uniqueElement).not.toBeVisible();
    }
}