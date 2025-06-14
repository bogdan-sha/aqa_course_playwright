import { Modal } from "../customers/modal.page";
import {MANUFACTURERS} from "data/products/manufacturer.data";
import {IProduct} from "types/product.types";

export class ProductDetailsModal extends Modal {
    readonly modalBody = this.page.locator(`#details-modal-body-container`);
    readonly values = this.modalBody.locator("p");

    uniqueElement = this.modalBody;

    async getDetails(): Promise<Required<IProduct> & { createdOn: string }> {
        const [name, amount, price, manufacturer, createdOn, notes] = await this.values.allInnerTexts();
        return {
            name,
            amount: +amount,
            price: +price,
            manufacturer: manufacturer as MANUFACTURERS,
            createdOn,
            notes,
        };
    }
}