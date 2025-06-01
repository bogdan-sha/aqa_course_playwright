/* Разработать тест со следующими шагами:
https://anatoly-karpovich.github.io/demo-shopping-cart/
  - добавить продукты 2,4,6,8,10
  - завалидировать бейдж с количеством
  - открыть чекаут
  - завалидировать сумму и продукты
  - ввести все найденные вами промокоды (вспоминаем первую лекцию)
  - завалидировать конечную сумму
  - зачекаутиться
  - завалидировать сумму */

import test, { expect, Page } from 'playwright/test';

enum PromoCodes {
  promocode1 = 'JAVA-FOR-BOOMERS',
  promocode2 = 'NO-PYTHON',
  promocode3 = 'HOT-COURSE',
  promocode4 = '5-PERCENT-FOR-UTILS',
  promocode5 = '10-PERCENT-FOR-REDEEM',
  promocode6 = '15-PERCENT-FOR-CSS',
  promocode7 = 'HelloThere',
};

const ProductsToAdd = [
    'Product 2', 
    'Product 4', 
    'Product 6', 
    'Product 8', 
    'Product 10'
];

test.describe('[UI] [Demo Shopping Cart] Put products to busket with promocodes', () => {
    test('Put 5 products with promocodes to busket', async ({ page }) => {
        await page.goto('https://anatoly-karpovich.github.io/demo-shopping-cart/');

        await addProductsToCart(ProductsToAdd, page);

        const total = await getProductsPriceTotal(ProductsToAdd, page);

        await expect(page.locator('#badge-number')).toHaveText(ProductsToAdd.length.toString());
        await page.getByRole('button', {name: 'Shopping Cart'}).click();

        await expect(page.locator('#total-price')).toHaveText(`$${total}.00`);

        const expectedProducts = ['Product 2', 'Product 4', 'Product 6', 'Product 8', 'Product 10'];
        const actualProducts = await page.locator('h5.fw-bold').allTextContents();
        await expect(actualProducts).toEqual(expectedProducts);

        await applyPromocodes(page, Object.values(PromoCodes));

        const totalDiscountPercentage = await getTotalDiscountPercentage(page);
        const { discount: calculatedDiscount, finalPrice: priceWithDiscount } = calculateDiscountedPrice(total, totalDiscountPercentage);

        await expect(page.locator('#total-price')).toHaveText(
        `$${priceWithDiscount.toFixed(2)} (-$${calculatedDiscount.toFixed(1)})`
        );

        await page.locator('#continue-to-checkout-button').click();
        await expect(page.locator('.text-muted')).toHaveText(
        `$${priceWithDiscount.toFixed(2)}`
        );
    });
});

function getAddToCardButton(productName: string, page: Page) {
    return page
        .locator('div.card-body')
        .filter({
        has: page.getByText(productName, {exact: true}),
        })
        .getByRole('button', {name: 'Add to card'});
};

async function addProductsToCart(productName: string[], page: Page) {
  for (const name of productName) {
    await getAddToCardButton(name, page).click();
  }
}

async function getProductsPriceTotal(productNames: string[], page: Page): Promise<number> {
  let total = 0;

  for (const productName of productNames) {
    const priceElement = getPriceForCard(productName, page);
    const priceText = await priceElement.innerText();
    const price = +priceText.replace('$', '');
    total += price;
  }

  return total;
}

function getPriceForCard(productName: string, page: Page) {
    return page
        .locator('div.card-body')
        .filter({
        has: page.getByText(productName, {exact: true}),
        })
        .locator('span');
};

async function getTotalDiscountPercentage(page: Page) {
  const discountTexts = await page
    .locator('#rebates-list small')
    .allInnerTexts();
  const totalDiscount = discountTexts.reduce(
    (sum, discountText) =>
      sum + +discountText.replace('-', '').replace('%', ''),
    0
  );

  return totalDiscount;
}

async function applyPromocodes(page: Page, promocodeList: string[]) {
  const promocodeInput = page.locator('#rebate-input');
  const submitPromocodeButton = page.locator('#apply-promocode-button');

  for (const promocode of promocodeList) {
    await promocodeInput.fill(promocode);
    await submitPromocodeButton.click();
    await expect(page.locator('.spinner-border')).toBeHidden({timeout: 10000});
  }
}

function calculateDiscountedPrice(total: number, discountPercent: number) {
  const discount = total * (discountPercent / 100);
  const finalPrice = total - discount;
  return { discount, finalPrice };
}