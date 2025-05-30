import { Locator, Page } from "@playwright/test";
import {SalesPortalPage} from "../salesPortal.page";

export class CustomersPage extends SalesPortalPage{

    addNewCustomerButton = this.page.getByRole('button', {name: 'Add Customer'});

    uniqueElement = this.addNewCustomerButton;

    async clickAddNewCustomerButton() {
        await this.addNewCustomerButton.click();
    }
}