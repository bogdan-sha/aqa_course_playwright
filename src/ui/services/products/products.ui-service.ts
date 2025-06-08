import { ProductsPage } from "../../pages/products/products.page";
import { AddNewProductPage } from "../../pages/products/add-new-product.page";
import { Page } from "@playwright/test";

export class ProductsUIService {
    private productsPage: ProductsPage;
    private addNewProductPage: AddNewProductPage;
    constructor(private page: Page) {
        this.productsPage = new ProductsPage(page);
        this.addNewProductPage = new AddNewProductPage(page);
    }

    async openAddPage() {
        await this.productsPage.clickAddNewProduct();
        await this.addNewProductPage.waitForOpened();
    }
}