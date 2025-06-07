import { test as base, expect } from "./pages.fixtures";
import { PORTAL_URL, USER_LOGIN, USER_PASSWORD } from "../config/environment";

interface IBusinessSteps {
    loginAsLocalUser(): Promise<void>;
}

export const test = base.extend<IBusinessSteps>({
    loginAsLocalUser: async ({ page, homePage, signInPage }, use) => {
        await use(async () => {
            await page.goto(PORTAL_URL);
            //await signInPage.waitForOpened();
            await signInPage.fillInputs(USER_LOGIN, USER_PASSWORD);
            await signInPage.clickLoginButton();
            await homePage.waitForOpened()
        });
    },
});

export { expect } from "@playwright/test";