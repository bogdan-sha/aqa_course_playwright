import {IResponseFields} from "./api.types";

export type ModuleName = 'Customers' | 'Products' | 'Orders';

export interface IMetricsOrder {
    totalOrders: number;
    totalCanceledOrders: number;
    totalNewCustomers: number;
}

export interface IMetricsResponse extends IResponseFields {
    Metrics: {
        customers: {
            customerGrowth: Array<{}>;
            topCustomers: Array<{}>;
            totalNewCustomers: number;
        };
        orders: {
            averageOrderValue: number;
            ordersCountPerDay: Array<{}>;
            recentOrders: Array<{}>;
            totalCanceledOrders: number
            totalOrders: number;
            totalRevenue: number;
        }
        products: {
            topProducts: Array<{}>;
        };
    }
}