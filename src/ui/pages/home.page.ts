import { Locator } from "@playwright/test";
import {IMetricsOrder, ModuleName} from "types/home.types";
import { SalesPortalPage } from "./salesPortal.page";


export class HomePage extends SalesPortalPage {

    title = this.page.locator('.welcome-text');
    customersButton = this.page.getByRole('link', { name: 'Customer' });
    productsButton = this.page.getByRole('link', { name: 'Products' });
    ordersButton = this.page.getByRole('link', { name: 'Orders' });

    uniqueElement = this.title;

    totalOrders = this.page.locator("#total-orders-container .card-text");
    totalRevenue = this.page.locator("#total-revenue-container .card-text");
    totalNewCustomers = this.page.locator("#total-customers-container .card-text");
    averageOrderValue = this.page.locator("#avg-orders-value-container .card-text");
    totalCanceledOrders = this.page.locator("#canceled-orders-container .card-text");

    async clickModuleButton(moduleName: ModuleName) {
        const moduleButtons: Record<ModuleName, Locator> = {
            Customers: this.customersButton,
            Products: this.productsButton,
            Orders: this.ordersButton,
        };

        await moduleButtons[moduleName].click();
    };

    async getMetricsOrders(): Promise<IMetricsOrder> {
        const [totalOrders, totalCanceledOrders, totalNewCustomers] = await Promise.all([
            this.totalOrders.innerText(),
            this.totalCanceledOrders.innerText(),
            this.totalNewCustomers.innerText(),
        ]);
        return {
            totalOrders: Number(totalOrders),
            totalCanceledOrders: Number(totalCanceledOrders),
            totalNewCustomers: Number(totalNewCustomers),
        };
    };
}