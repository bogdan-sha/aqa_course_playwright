import { IResponseFields, productsSortField, sortDirection } from "./api.types";
import { MANUFACTURERS } from "data/products/manufacturer.data";

export interface IProduct {
    name: string;
    manufacturer: MANUFACTURERS;
    price: number;
    amount: number;
    notes?: string;
}

export interface IProductFromResponse extends IProduct {
    _id: string;
    createdOn: string;
}

export interface IProductResponse extends IResponseFields {
    Product: IProductFromResponse;
}

export interface IProductsResponse extends IResponseFields {
    Products: IProductFromResponse[];
    sorting: {
        sortField: productsSortField;
        sortOrder: sortDirection;
    };
}

export type IProductInTable = Pick<IProduct, "name" | "price" | "manufacturer">;