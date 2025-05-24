/*
Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/

Требования:
Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних
пробелов запрещен
*/

import {expect, test} from "@playwright/test";

test.describe('[UI] [Demo Login Form] Registration', () => {
    const validCredentials = {
        username: 'shamukov',
        password: '12345678Qaz',
    };
    const invalidCredentials = {
        usernameWithSpaces: '   ',
        passwordWithSpaces: '        ',
        prefixUsername: ' username',
        postfixUsername: 'username ',
        prefixPassword: ' Password',
        postfixPassword: 'Password ',
        shortUsername: 'sh',
        shortPassword: '12345Qa',
        longUsername: 'usernameusernameusernameusernameusername1',
        longPassword: '1Qwerty1Qwerty1Qwerty',
        lowerCasePassword: 'abcdefgh',
        upperCasePassword: 'ABCDEFGH',
    };

    test.beforeEach(async ({ page }) => {
        await page.goto('https://anatoly-karpovich.github.io/demo-login-form/');
        await page.locator('#registerOnLogin').click();
    });

    test('Register new user', async ({page}) => {
        await page.locator('#userNameOnRegister').fill(validCredentials.username);
        await page.locator('#passwordOnRegister').fill(validCredentials.password);
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page.getByRole('heading', { name: 'Successfully registered!' })).toBeVisible();
    });

    test.describe('Negative cases for registration',() => {

        test('Register with empty fields', async ({page}) => {
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', {name: 'Please, provide valid data'})).toBeVisible();
        });

        test('Register with empty username', async ({page}) => {
            await page.locator('#passwordOnRegister').fill(validCredentials.password);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', {name: 'Username is required'})).toBeVisible();
        });

        test('Register with empty password', async ({page}) => {
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', {name: 'Password is required'})).toBeVisible();
        });

        test('Register with username all spaces', async ({page}) => {
            await page.locator('#userNameOnRegister').fill(invalidCredentials.usernameWithSpaces);
            await page.locator('#passwordOnRegister').fill(validCredentials.password);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Prefix and postfix spaces are not allowed is username' })).toBeVisible();
        });

        test('Register with password all spaces', async ({page}) => {
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.locator('#passwordOnRegister').fill(invalidCredentials.passwordWithSpaces);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Password is required' })).toBeVisible();
        });

        test('Register with short username', async ({page}) => {
            await page.locator('#userNameOnRegister').fill(invalidCredentials.shortUsername);
            await page.locator('#passwordOnRegister').fill(validCredentials.password);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Username should contain at least 3 characters' })).toBeVisible();
        });

        test('Register with short password', async ({page}) => {
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.locator('#passwordOnRegister').fill(invalidCredentials.shortPassword);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Password should contain at least 8 characters' })).toBeVisible();
        });

        test('Register with long username', async ({page}) => { // Defect
            await page.locator('#userNameOnRegister').fill(invalidCredentials.longUsername);
            await page.locator('#passwordOnRegister').fill(validCredentials.password);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Username can\'t exceed 40 characters' })).toBeVisible();
        });

        test('Register with long password', async ({page}) => { // Defect
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.locator('#passwordOnRegister').fill(invalidCredentials.longPassword);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Password can\'t exceed 20 characters' })).toBeVisible();
        });

        test('Register with prefix username', async ({page}) => {
            await page.locator('#userNameOnRegister').fill(invalidCredentials.prefixUsername);
            await page.locator('#passwordOnRegister').fill(validCredentials.password);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Prefix and postfix spaces are not allowed is username' })).toBeVisible();
        });

        test('Register with postfix username', async ({page}) => {
            await page.locator('#userNameOnRegister').fill(invalidCredentials.postfixUsername);
            await page.locator('#passwordOnRegister').fill(validCredentials.password);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Prefix and postfix spaces are not allowed is username' })).toBeVisible();
        });

        test('Register with prefix password', async ({page}) => { // Defect
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.locator('#passwordOnRegister').fill(invalidCredentials.prefixPassword);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Prefix and postfix spaces are not allowed is password' })).toBeVisible();
        });

        test('Register with postfix password', async ({page}) => { // Defect
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.locator('#passwordOnRegister').fill(invalidCredentials.postfixPassword);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Prefix and postfix spaces are not allowed is username' })).toBeVisible();
        });

        test('Register with lowercase password', async ({page}) => { // Defect
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.locator('#passwordOnRegister').fill(invalidCredentials.lowerCasePassword);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Password should contain at least one character in upper case' })).toBeVisible();
        });

        test('Register with uppercase password', async ({page}) => {
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.locator('#passwordOnRegister').fill(invalidCredentials.upperCasePassword);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Password should contain at least one character in lower case' })).toBeVisible();
        });

        test('Register with already created user', async ({page}) => {
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.locator('#passwordOnRegister').fill(validCredentials.password);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Successfully registered!' })).toBeVisible();
            await page.locator('#backOnRegister').click();
            await page.locator('#registerOnLogin').click()
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.locator('#passwordOnRegister').fill(validCredentials.password);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Username is in use' })).toBeVisible();
        })

    })

    test.afterEach(async ({ page }) => {
        await page.locator('#backOnRegister').click();
    });
});