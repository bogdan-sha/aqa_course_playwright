import { test as base } from "@playwright/test";
import { CustomersController } from "api/controllers/customers.controller";
import { SignInController } from "api/controllers/sign-in.controller";

interface ISalesPortalControllers {
    customersController: CustomersController;
    signInController: SignInController;
}

export const test = base.extend<ISalesPortalControllers>({
    customersController: async ({ request }, use) => {
        await use(new CustomersController(request));
    },
    signInController: async ({ request }, use) => {
        await use(new SignInController(request));
    },
});

export { expect } from "@playwright/test";