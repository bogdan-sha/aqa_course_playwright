import {test} from "@playwright/test";
import {HomePage} from "../../../pages/home.page";
import {CustomersPage} from "../../../pages/customers/customers.page";
import {AddNewCustomerPage} from "../../../pages/customers/add-new-customers.page";
import {COUNTRIES} from "../../../../data/customers/countries.data";
import {NOTIFICATIONS} from "../../../../data/notifications.data";
import {generateCustomerData} from "../../../../data/customers/generateCustomer.data";
import {SignInPage} from "../../../pages/signIn.page";
import {PORTAL_URL, USER_LOGIN, USER_PASSWORD} from "../../../../config/environment";


test.describe('[UI] [Sales Portal] [Customers]', () => {
    test('Create customer with smoke data', async ({ page }) => {
        const signInPage = new SignInPage(page);
        const homePage = new HomePage(page);
        const customersPage = new CustomersPage(page);
        const addNewCustomerPage = new AddNewCustomerPage(page);

        await page.goto(PORTAL_URL);

        await signInPage.waitForOpened()
        await signInPage.fillInputs(USER_LOGIN, USER_PASSWORD);
        await signInPage.clickLoginButton()

        await homePage.waitForOpened();
        await homePage.clickModuleButton('Customers');
        await customersPage.waitForOpened()
        await customersPage.clickAddNewCustomerButton();
        await addNewCustomerPage.waitForOpened();
        const data = generateCustomerData({ country: COUNTRIES.BELARUS});
        await addNewCustomerPage.fillInputs(data);
        await addNewCustomerPage.clickSaveNewCustomer();
        await customersPage.waitForOpened();
        await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);
    })
});