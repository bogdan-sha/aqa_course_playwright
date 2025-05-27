/* Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
https://anatoly-karpovich.github.io/demo-login-form/

Требования:
Страница регистрации:
  Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
  Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

Страница логина:
  Username: обязательное
  Password: обязательное */

import test, { expect } from 'playwright/test';

interface IRegistrationTestData {
    testName: string,
    username: string,
    password: string,
    message: string,
};

const registrationInvalidTestData: IRegistrationTestData[] = [
    {
        testName: 'Register with empty fields',
        username: '',
        password: '',
        message: 'Please, provide valid data',
    },
    {
        testName: 'Register with only spaces',
        username: '   ',
        password: '        ',
        message: 'Please, provide valid data',
    },
    {
        testName: 'Register with empty username',
        username: '',
        password: '123456Az',
        message: 'Username is required',
    },
    {
        testName: 'Register with short username',
        username: 'Te',
        password: '123456Az',
        message: 'Username should contain at least 3 characters',
    },
    {
        testName: 'Register with less username',
        username: 'Testuser01Testuser02Testuser03Testuser041',
        password: '123456Az',
        message: 'Username can\'t exceed 40 characters',
    },
    {
        testName: 'Register with empty password',
        username: 'Tes',
        password: '',
        message: 'Password is required',
    },
    {
        testName: 'Register with short password',
        username: 'Tes',
        password: '12345Az',
        message: 'Password should contain at least 8 characters',
    },
    {
        testName: 'Register with less password',
        username: 'Tes',
        password: '12345678Az12345678Za1',
        message: 'Password can\'t exceed 20 characters',
    },
    {
        testName: 'Register with password where only upper case',
        username: 'Tes',
        password: '123456AA',
        message: 'Password should contain at least one character in lower case',
    },
    {
        testName: 'Register with password where only lower case', // Defect
        username: 'Tes',
        password: '123456zz',
        message: 'Password should contain at least one character in upper case',
    },
    {
        testName: 'Register with prefix username',
        username: ' Tes',
        password: '123456Az',
        message: 'Prefix and postfix spaces are not allowed is username',
    },
    {
        testName: 'Register with postfix username',
        username: 'Tes ',
        password: '123456Az',
        message: 'Prefix and postfix spaces are not allowed is username',
    }
];

const selectors = {
  registerButtonOnLogin: '#registerOnLogin',
  userNameOnRegister: '#userNameOnRegister',
  passwordOnRegister: '#passwordOnRegister',
  registerButton: '#register',
  errorMessageOnRegister: '#errorMessageOnRegister',
  backOnRegister: '#backOnRegister',
};

test.describe('[UI] [Demo login form] Registration with negative test cases', () => {
    registrationInvalidTestData.forEach(({ testName, username, password, message}) => {
        test(testName, async ({page}) => {
            await page.goto('https://anatoly-karpovich.github.io/demo-login-form/');
            await page.locator(selectors.registerButtonOnLogin).click();

            await page.evaluate(() => {
                const passwordInput = document.querySelector('#passwordOnRegister');
                if (passwordInput) passwordInput.removeAttribute('maxlength');
                const userNameInput = document.querySelector('#userNameOnRegister');
                if (userNameInput) userNameInput.removeAttribute('maxlength');
            });

            await page.locator(selectors.userNameOnRegister).fill(username);
            await page.locator(selectors.passwordOnRegister).fill(password);
            await page.locator(selectors.registerButton).click();
            await expect(page.locator(selectors.errorMessageOnRegister)).toHaveText(message);
        });
    });

    test('Register existing user', async ({page}) => {
        await page.goto('https://anatoly-karpovich.github.io/demo-login-form/');
        await page.locator(selectors.registerButtonOnLogin).click();
        await page.locator(selectors.userNameOnRegister).fill('Created');
        await page.locator(selectors.passwordOnRegister).fill('123456Az');
        await page.locator(selectors.registerButton).click();
        await page.locator(selectors.backOnRegister).click();
        await page.locator(selectors.registerButtonOnLogin).click();
        await page.locator(selectors.userNameOnRegister).fill('Created');
        await page.locator(selectors.passwordOnRegister).fill('123456Az');
        await page.locator(selectors.registerButton).click();
        await expect(page.locator(selectors.errorMessageOnRegister)).toHaveText('Username is in use');
    });
});