import {IProduct} from "types/product.types";
import {faker} from "@faker-js/faker";
import { getRandomEnumValue } from "utils/enum.utils";

export enum MANUFACTURERS {
    APPLE = "Apple",
    SAMSUNG = "Samsung",
    GOOGLE = "Google",
    MICROSOFT = "Microsoft",
    SONY = "Sony",
    XIAOMI = "Xiaomi",
    AMAZON = "Amazon",
    TESLA = "Tesla",
}

export function generateProductData(params?: Partial<IProduct>): IProduct {
    return {
        name: `Products ${faker.string.alpha(31)}`,
        manufacturer: getRandomEnumValue(MANUFACTURERS),
        price: faker.number.int(99999),
        amount: faker.number.int(5),
        notes: `Notes ${faker.string.alpha(244)}`,
        ...params,
    };
}