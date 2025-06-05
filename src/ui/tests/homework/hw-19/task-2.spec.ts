/* Разработать тест со следующими шагами:
 - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
 - Войти в приложения используя учетные данные test@gmail.com / 12345678 при этом:
 - дождаться исчезновения спиннеров
 - проверить действительно ли пользователь с логином Anatoly вошел в систему
 - Проверить скриншотом боковое навигационное меню с выбранной страницей Home */

 import { test, expect} from '@playwright/test';

 test.describe('[UI] [Aqa-course-project] Authorize like Anatoly user', async () => {
    test('Check authorization by Anatoly user', async ({ page }) => {
        const spinner = page.locator('span.spinner-border');
        const userDropdown = page.getByText('Anatoly');

        await page.goto('https://anatoly-karpovich.github.io/aqa-course-project/#');
        await page.locator('#emailinput').fill('test@gmail.com');
        await page.locator('#passwordinput').fill('12345678');
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(spinner).toHaveCount(0, {timeout: 10000});
        await expect(userDropdown).toContainText('Anatoly');
        await expect(page.getByRole('link', { name: 'Anatoly' })).toHaveScreenshot();
    
  });
 }); 