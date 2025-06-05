import { test, expect } from "fixtures/businessSteps.fixtures";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import {COUNTRIES} from "../../../../data/customers/countries.data";
import {NOTIFICATIONS} from "../../../../data/notifications.data";
import _ from 'lodash';
import {DeleteModal} from "../../../pages/modals/customers/delete.modals";

test.describe('UI] [Sales Portal] [Customers]', () => {
    test('Should check that new customer in table successfully deleted', async ({ page, homePage, loginAsLocalUser, customersPage, addNewCustomerPage }) => {

        await loginAsLocalUser();

        await homePage.clickModuleButton('Customers');
        await customersPage.waitForOpened();
        await customersPage.clickAddNewCustomerButton();
        await addNewCustomerPage.waitForOpened();
        const data = generateCustomerData();
        await addNewCustomerPage.fillInputs(data);
        await addNewCustomerPage.clickSaveNewCustomer();
        await customersPage.waitForOpened();
        await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);//test
        await customersPage.clickCloseNotification(); // test

        expect(await customersPage.isCustomerFirstInTable(data.email), 'Created customer first in the table').toBe(true);

        await customersPage.clickTableAction(data.email, 'delete');
        await customersPage.deleteModal.waitForOpened();
        await customersPage.deleteModal.clickDelete();
        await customersPage.deleteModal.waitForClosed();
        expect(await customersPage.isCustomerFirstInTable(data.email), 'Created customer first in the table').toBe(false);
    });
});