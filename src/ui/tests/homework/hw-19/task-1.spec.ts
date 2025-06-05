/* Разработать тест со следующими шагами:

  - открыть https://the-internet.herokuapp.com/
  - перейти на страницу Dynamic Controls
  - Дождаться появления кнопки Remove
  - Завалидировать текста в заголовке страницы
  - Чекнуть чекбокс
  - Кликнуть по кнопке Remove
  - Дождаться исчезновения чекбокса
  - Проверить наличие кнопки Add
  - Завалидировать текст It's gone!
  - Кликнуть на кнопку Add
  - Дождаться появления чекбокса
  - Завалидировать текст It's back! */

import { test, expect} from '@playwright/test';

test.describe('[UI] [Herokuapp] Check remove/add functionality', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
    });

    test('Check remove/add buttons', async ({page}) => {
        
        const expectedMessages = {
            textOfHeader: 'Dynamic Controls',
            textOfSubHeader: 'This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.',
            textGoneMessage: 'It\'s gone!',
            textBackMessage: 'It\'s back!',
        }

        const dynamicLoadingLink = page.getByRole('link', { name: 'Dynamic Controls', exact: true});
        const removeButton = page.getByRole('button', { name: 'Remove'});
        const header = page.getByRole('heading', { name: 'Dynamic Controls'});
        const subHeader = page.locator('#content > div > p');
        const checkbox = page.getByRole('checkbox');
        const addButton = page.getByRole('button', { name: 'Add'});
        const goneMessage = page.getByText('It\'s gone!');
        const backMessage = page.getByText('It\'s back!');

        await dynamicLoadingLink.click();
        await expect(removeButton).toBeVisible();
        await expect(header).toHaveText(expectedMessages.textOfHeader);
        await expect(subHeader).toHaveText(expectedMessages.textOfSubHeader);

        await checkbox.check();
        await expect(checkbox).toBeChecked();

        await removeButton.click();
        await checkbox.waitFor({state: 'hidden', timeout: 10000});
        await expect(addButton).toBeVisible();
        await expect(goneMessage).toHaveText(expectedMessages.textGoneMessage);

        await addButton.click();
        await checkbox.waitFor({state: 'visible', timeout: 10000});
        await expect(backMessage).toHaveText(expectedMessages.textBackMessage);
        await expect(checkbox).not.toBeChecked();

    });
})