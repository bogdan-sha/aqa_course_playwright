import { RequestApi } from "api/apiClients/request";
import { APIRequestContext } from "@playwright/test";
import { IProduct, IProductResponse, IProductsResponse } from "types/product.types";
import { IRequestOptions } from "types/api.types";
import { apiConfig } from "config/api-config";
import { convertRequestParams } from "../../utils/requestParams";

export class ProductsController {
    private request: RequestApi;

    constructor(context: APIRequestContext) {
        this.request = new RequestApi(context);
    }

    async create(body: IProduct, token: string) {
        const options: IRequestOptions = {
            baseURL: apiConfig.BASE_URL,
            url: apiConfig.ENDPOINTS.PRODUCTS,
            method: "post",
            data: body,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        return await this.request.send<IProductResponse>(options);
    }

    //получение product по id
    async getById(id: string, token: string) {
        const options: IRequestOptions = {
            baseURL: apiConfig.BASE_URL,
            url: apiConfig.ENDPOINTS.PRODUCT_BY_ID(id),
            method: "get",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        return await this.request.send<IProductResponse>(options);
    }
    //получение всех products + фильтр парам в урле
    async getAll(token: string, params?: Record<string, string>) {
        const options: IRequestOptions = {
            baseURL: apiConfig.BASE_URL,
            url: apiConfig.ENDPOINTS.PRODUCTS + (params ? convertRequestParams(params) : ""),
            method: "get",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        return await this.request.send<IProductsResponse>(options);
    }

    //обновление данных product по его id
    async update(id: string, body: IProduct, token: string) {
        const options: IRequestOptions = {
            baseURL: apiConfig.BASE_URL,
            url: apiConfig.ENDPOINTS.PRODUCT_BY_ID(id),
            method: "put",
            data: body,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        return await this.request.send<IProductResponse>(options);
    }

    //удаление product по его id
    async delete(id: string, token: string) {
        const options: IRequestOptions = {
            baseURL: apiConfig.BASE_URL,
            url: apiConfig.ENDPOINTS.PRODUCT_BY_ID(id),
            method: "delete",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        return await this.request.send<null>(options);
    }
}