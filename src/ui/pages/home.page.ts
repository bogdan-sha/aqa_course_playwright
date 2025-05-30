import { Locator, Page } from "@playwright/test";
import {ModuleName} from "../../types/home.types";
import {SalesPortalPage} from "./salesPortal.page";


export class HomePage extends SalesPortalPage{

    title= this.page.locator('.welcome-text');
    customerButton = this.page.getByRole('link', { name: 'Customer' });
    productsButton = this.page.getByRole('link', { name: 'Products' });
    ordersButton = this.page.getByRole('link', { name: 'Orders' });

    uniqueElement = this.title;

    async clickModuleButton(moduleName: ModuleName) {
        let moduleButton: Locator;

        const moduleButtons: Record<ModuleName, Locator> = {
            Customers: this.customerButton,
            Products: this.productsButton,
            Orders: this.ordersButton,
        };

        await moduleButtons[moduleName].click();
    }
}

