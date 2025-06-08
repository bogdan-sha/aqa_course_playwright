import { IProduct } from "types/product.types";
import { SalesPortalPage } from "../salesPortal.page";

export class AddNewProductPage extends SalesPortalPage {
    readonly nameInput = this.page.locator("#inputName");
    readonly manufacturerInput = this.page.locator("#inputManufacturer");
    readonly priceInput = this.page.locator("#inputPrice");
    readonly amountInput = this.page.locator("#inputAmount");
    readonly notesInput = this.page.locator("#textareaNotes");
    readonly saveNewProductButton = this.page.locator("#save-new-product");

    readonly uniqueElement = this.saveNewProductButton;

    async fillInputs(product: Partial<IProduct>) {
        product.name && (await this.nameInput.fill(product.name));
        product.manufacturer && (await this.manufacturerInput.selectOption(product.manufacturer));
        product.price && (await this.priceInput.fill(product.price.toString()));
        product.amount && (await this.amountInput.fill(product.amount.toString()));
        product.notes && (await this.notesInput.fill(product.notes));
    }

    async clickSaveNewProduct() {
        await this.saveNewProductButton.click();
    }
}