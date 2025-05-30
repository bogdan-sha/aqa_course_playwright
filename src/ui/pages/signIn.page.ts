import {SalesPortalPage} from "./salesPortal.page";

export class SignInPage extends SalesPortalPage {
    emailInput = this.page.locator('#emailinput');
    passwordInput = this.page.locator('#passwordinput');
    loginButton = this.page.getByRole('button', { name: 'Login'});
    rememberMeCheckbox = this.page.getByRole('checkbox', { name: 'Remember me' });

    uniqueElement = this.rememberMeCheckbox;

    async fillInputs(email: string, password: string) {
        await this.emailInput.fill(`${email}`);
        await this.passwordInput.fill(`${password}`);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }
}