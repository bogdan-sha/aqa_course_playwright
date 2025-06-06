import {SalesPortalPage} from "./salesPortal.page";

export class SignInPage extends SalesPortalPage {
    readonly emailInput = this.page.locator('#emailinput');
    readonly passwordInput = this.page.locator('#passwordinput');
    readonly loginButton = this.page.getByRole('button', { name: 'Login'});
    readonly rememberMeCheckbox = this.page.getByRole('checkbox', { name: 'Remember me' });

    uniqueElement = this.rememberMeCheckbox;

    async fillInputs(email: string, password: string) {
        await this.emailInput.fill(`${email}`);
        await this.passwordInput.fill(`${password}`);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }
}