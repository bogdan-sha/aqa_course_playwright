import {SalesPortalPage} from "./salesPortal.page";

export class SignInPage extends SalesPortalPage {
    private readonly emailInput = this.page.locator('#emailinput');
    private readonly passwordInput = this.page.locator('#passwordinput');
    private readonly loginButton = this.page.getByRole('button', { name: 'Login'});
    private readonly rememberMeCheckbox = this.page.getByRole('checkbox', { name: 'Remember me' });

    uniqueElement = this.rememberMeCheckbox;

    async fillInputs(email: string, password: string) {
        await this.emailInput.fill(`${email}`);
        await this.passwordInput.fill(`${password}`);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }
}