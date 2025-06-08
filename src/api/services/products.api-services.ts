import { APIRequestContext, expect } from "@playwright/test";
import { ProductsController } from "api/controllers/products.controller";
import { generateProductData } from "data/products/generateProduct.data";
import { STATUS_CODES } from "data/statusCodes";
import { IProduct } from "types/product.types";
import { validateResponse } from "utils/validations/responseValidation";

export class ProductsApiService {
    controller: ProductsController;
    constructor(request: APIRequestContext) {
        this.controller = new ProductsController(request);
    }

    async create(token: string, productData?: IProduct) {
        const body = generateProductData(productData);
        const response = await this.controller.create(body, token);
        validateResponse(response, STATUS_CODES.CREATED, true, null);
        return response.body.Product;
    }
}