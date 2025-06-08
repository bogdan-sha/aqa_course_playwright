import { Page } from "@playwright/test";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { HomePage } from "ui/pages/home.page";
import { SignInPage } from "ui/pages/signIn.page";

export class SignInUIService {
    private signInPage: SignInPage;
    private homePage: HomePage;
    constructor(private page: Page) {
        this.signInPage = new SignInPage(page);
        this.homePage = new HomePage(page);
    }

    async signInAsLocalUser() {
        await this.signInPage.openPortal();
        await this.signInPage.fillInputs(USER_LOGIN, USER_PASSWORD); // тут нужно лучше типизировать
        await this.signInPage.clickLoginButton();
        await this.homePage.waitForOpened();
        const token = (await this.page.context().cookies()).find((c) => c.name === "Authorization")!.value;
        return token;
    }
}