import { faker } from "@faker-js/faker";
import { getRandomEnumValue } from "utils/enum.utils";
import { IProduct } from "types/product.types";
import { MANUFACTURERS } from "./manufacturer.data";

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