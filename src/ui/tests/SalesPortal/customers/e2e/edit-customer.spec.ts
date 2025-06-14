import { STATUS_CODES } from "data/statusCodes";
import { expect, test } from "fixtures/ui-services.fixture";

test.describe("[E2E] [UI] [Customers] [Edit]", () => {
    let id = "";
    let token = "";
    test("Edit customer with smoke data", async ({
                                                     signInUIService,
                                                     homeUIService,
                                                     customersUIService,
                                                     editCustomerUIService,
                                                     customersController,
                                                     customersApiService,
                                                 }) => {
        token = await signInUIService.signInAsLocalUser();
        const createdCustomer = await customersApiService.create(token);
        await homeUIService.openModule("Customers");
        await customersUIService.openEditPage(createdCustomer.email);
        const updatedCustomer = await editCustomerUIService.edit();
        const response = await customersController.getById(updatedCustomer._id, token);
        id = updatedCustomer._id;
        expect(response.status).toBe(STATUS_CODES.OK);
    });

    test.afterEach(async ({ customersController }) => {
        await customersController.delete(id, token);
    });
});