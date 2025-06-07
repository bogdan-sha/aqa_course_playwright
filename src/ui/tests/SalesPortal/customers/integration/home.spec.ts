// Создайте 3 интеграционных теста для проверки следующих метрик на странице Home:
// 1. Orders This Year
// 2. New Customers
// 3. Canceled Orders

// Для реализации подмокивайте респонс эндпоинта metrics
//   - Orders This Year: Metrics.orders.totalOrders
//   - New Customers: Metrics.customers.customers
//   - Canceled Orders: Metrics.orders.totalCanceledOrders
// Остальной объект оставьте как есть сейчас в респонсе, замените просто на ваши данные в метриках нужных
import { test, expect } from "fixtures/businessSteps.fixture";
import { IMetricsResponse } from "../../../../../types/home.types";

test.describe("[UI] [Home page] [Metrics]", async () => {
    const mockData: IMetricsResponse = {
        IsSuccess: true,
        ErrorMessage: null,
        Metrics: {
            orders: {
                totalRevenue: 100,
                totalOrders: 50,
                averageOrderValue: 200,
                totalCanceledOrders: 10,
                ordersCountPerDay: [],
                recentOrders: [],
            },
            customers: {
                topCustomers: [],
                totalNewCustomers: 1000,
                customerGrowth: [],
            },
            products: {
                topProducts: [],
            },
        },
    };

    test("[Metrics] Should display correct value for Orders This Year", async ({ loginAsLocalUser, homePage, mock }) => {
        const mockResponse = { ...mockData, Metrics: { ...mockData.Metrics, orders: { ...mockData.Metrics.orders, totalOrders: 123 } } };

        await mock.homeMetricOrder(mockResponse);
        await loginAsLocalUser();
        await homePage.waitForOpened();

        const metrics = await homePage.getMetricsOrders();
        expect(metrics.totalOrders).toBe(123);
    });

    test("[Metrics] Should display correct value for New Customers", async ({ loginAsLocalUser, homePage, mock }) => {
        const mockResponse = { ...mockData, Metrics: { ...mockData.Metrics, customers: { ...mockData.Metrics.customers, totalNewCustomers: 777 } } };

        await mock.homeMetricOrder(mockResponse);
        await loginAsLocalUser();
        await homePage.waitForOpened();

        const metrics = await homePage.getMetricsOrders();
        expect(metrics.totalNewCustomers).toBe(777);
    });

    test("[Metrics] Should display correct value for Canceled Orders", async ({ loginAsLocalUser, homePage, mock }) => {
        const mockResponse = { ...mockData, Metrics: { ...mockData.Metrics, orders: { ...mockData.Metrics.orders, totalCanceledOrders: 42 } } };

        await mock.homeMetricOrder(mockResponse);
        await loginAsLocalUser();
        await homePage.waitForOpened();

        const metrics = await homePage.getMetricsOrders();
        expect(metrics.totalCanceledOrders).toBe(42);
    });
});