import { expect, Page } from "@playwright/test";
import { AddNewProductPage } from "ui/pages/products/add-new-product.page";
import { ProductsPage } from "ui/pages/products/products.page";
import { IProduct, IProductResponse } from "types/product.types";
import { generateProductData } from "data/products/generateProduct.data";
import { apiConfig } from "config/api-config";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";


export class AddNewProductUiService {
    private addNewProductPage: AddNewProductPage;
    private productsPage: ProductsPage;
    constructor(private page: Page) {
        this.addNewProductPage = new AddNewProductPage(page);
        this.productsPage = new ProductsPage(page);
    }

    async create(productData?:IProduct) {
        const data = generateProductData(productData);
        await this.addNewProductPage.fillInputs(data);
        const response = await this.addNewProductPage.interceptResponse<IProductResponse, any>(
            apiConfig.ENDPOINTS.PRODUCTS,
            this.addNewProductPage.clickSaveNewProduct.bind(this.addNewProductPage)
        );
        expect(response.status).toBe(STATUS_CODES.CREATED);
        expect(_.omit(response.body.Product, "_id", "createdOn")).toEqual({ ...data });
        await this.productsPage.waitForOpened();
        return response.body.Product;
    }
}