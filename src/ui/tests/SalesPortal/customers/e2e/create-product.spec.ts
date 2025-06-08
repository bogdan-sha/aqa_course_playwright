import { expect, test } from "fixtures/ui-services.fixture";
import { STATUS_CODES } from "data/statusCodes";

test.describe("[E2E] [UI] [Products] [Create]", () => {
    let id = "";
    let token = "";
    test("Create customer with smoke data", async ({
                                                       signInUIService,
                                                       homeUIService,
                                                       productsUIService,
                                                       addNewProductUiService,
                                                       productsController,
                                                       productsPage,
                                                   }) => {
        token = await signInUIService.signInAsLocalUser();
        await homeUIService.openModule("Products");
        await productsUIService.openAddPage();
        const createdProduct = await addNewProductUiService.create();
        const response = await productsController.getById(createdProduct._id, token);
        id = createdProduct._id;
        expect(response.status).toBe(STATUS_CODES.OK);
        expect(
            await productsPage.isProductFirstInTable(createdProduct.name),
            'Created customer first in the table'
        ).toBe(true);
    });

    test.afterEach(async ({ productsController }) => {
        await productsController.delete(id, token);
    });
});