//import {expect, test} from "@playwright/test";
import { test, expect } from "fixtures/controllers.fixture";
import { apiConfig } from "config/api-config";
import  {USER_LOGIN, USER_PASSWORD } from "config/environment";
import { STATUS_CODES } from "data/statusCodes";
import { validateSchema } from "utils/validations/schemaValidation";
import { validateResponse } from "utils/validations/responseValidation";
import { signInSchema } from "data/schemas/customers/sign-in.schema";
import { ICredentials } from "../../../types/user.types";

test.describe('[API] [Customers] [Sign In]', () => {
    let token = "";

    test.skip('Sign in with exist user', async ({ request }) => {
        const loginResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN, {
            data: { username: USER_LOGIN, password: USER_PASSWORD },
            headers: {
                'content-type': 'application/json',
            },
        });

        const headers = loginResponse.headers();
        token = headers['authorization'];
        const body = await loginResponse.json();

        expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
        expect.soft(token).toBeTruthy();
        expect.soft(body.IsSuccess).toBe(true);
        expect.soft(body.ErrorMessage).toBe(null);
        validateSchema(signInSchema, body);
    });

    test("[Sign In Controller] Sign in with exist user", async ({ signInController }) => {
        const credential: ICredentials = {
            username: USER_LOGIN,
            password: USER_PASSWORD,
        };
        const loginResponse = await signInController.signIn(credential)

        const headers = loginResponse.headers;
        const token = headers['authorization'];
        const responseBody = loginResponse.body;

        validateResponse(loginResponse, STATUS_CODES.OK, true, null);
        expect.soft(token).toBeTruthy();
        validateSchema(signInSchema, responseBody);
    });
});