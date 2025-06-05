//import {expect, test} from "@playwright/test";
import {expect, test} from 'fixtures/pages.fixtures';
import {SignInPage} from "../../../pages/signIn.page";
import {HomePage} from "../../../pages/home.page";
import {CustomersPage} from "../../../pages/customers/customers.page";
import {AddNewCustomerPage} from "../../../pages/customers/add-new-customers.page";
import {PORTAL_URL, USER_LOGIN, USER_PASSWORD} from "../../../../config/environment";
import {generateCustomerData} from "../../../../data/customers/generateCustomer.data";
import {NOTIFICATIONS} from "../../../../data/notifications.data";
import _ from 'lodash';
import {FilterModal} from "../../../pages/modals/customers/filter.modals";

test.describe('UI] [Sales Portal] [Customers]', () => {
    test('Should check created customer in table', async ({ page, customersPage, homePage, signInPage, addNewCustomerPage }) => {
        //Precondition

        await page.goto(PORTAL_URL);

        await signInPage.waitForOpened();
        await signInPage.fillInputs(USER_LOGIN, USER_PASSWORD);
        await signInPage.clickLoginButton();

        await homePage.waitForOpened();
        await homePage.clickModuleButton('Customers');
        await customersPage.waitForOpened();
        await customersPage.clickAddNewCustomerButton();
        await addNewCustomerPage.waitForOpened();
        const data = generateCustomerData();
        await addNewCustomerPage.fillInputs(data);
        await addNewCustomerPage.clickSaveNewCustomer();
        await customersPage.waitForOpened();
        await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

        //Act
        await expect(customersPage.tableRowByEmail(data.email)).toBeVisible();

        //Assert
        const actualCustomerData = await customersPage.getCustomerData(data.email);
        expect(actualCustomerData).toEqual(_.pick(data, ["email", "name", "country"]));
        await customersPage.clickDeleteCustomer(data.email);
    })

    test('Should check filtered by country table data', async ({ page, customersPage, homePage, signInPage }) => {

        await page.goto(PORTAL_URL);
        await signInPage.waitForOpened()
        await signInPage.fillInputs(USER_LOGIN, USER_PASSWORD);
        await signInPage.clickLoginButton()

        await homePage.waitForOpened();
        await homePage.clickModuleButton('Customers');
        await customersPage.waitForOpened();
        await customersPage.clickFilter();
        await customersPage.filterModal.waitForOpened();
        const countriesToCheck = ['USA', 'Belarus', 'Germany']
        await customersPage.filterModal.checkFilters(...countriesToCheck);
        await customersPage.filterModal.clickApply();
        await customersPage.filterModal.waitForClosed();
        await customersPage.waitForOpened();
        const actualTableData = await customersPage.getTableData();
        expect(
            actualTableData.every((row) => countriesToCheck.includes(row.country)),
            `Expect table to contain only customers from ${countriesToCheck.join(', ')}`
        ).toBe(true);
    })
});