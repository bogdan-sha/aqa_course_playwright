import { test, expect } from "fixtures/controllers.fixture";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { customerSchema } from "data/schemas/customers/customer.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateSchema } from "utils/validations/schemaValidation";
import {ICredentials} from "../../../types/user.types";
import {validateResponse} from "../../../utils/validations/responseValidation";

test.describe("[API] [Customers] [Get By Id]", () => {
    test.skip("Should get created customer by id", async ({ request }) => {
        const loginResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN, {
            data: { username: USER_LOGIN, password: USER_PASSWORD },
            headers: {
                "content-type": "application/json",
            },
        });
        const headers = loginResponse.headers();
        const token = headers["authorization"];
        expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);

        const customerData = generateCustomerData();
        const customerResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS, {
            data: customerData,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const customerBody = await customerResponse.json();
        expect.soft(customerResponse.status()).toBe(STATUS_CODES.CREATED);

        const getResponse = await request.get(
            apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(customerBody.Customer._id),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "application/json",
                },
            }
        );

        const body = await getResponse.json();
        validateSchema(customerSchema, body);
        expect.soft(getResponse.status()).toBe(STATUS_CODES.OK);
        expect.soft(body.Customer).toMatchObject({ ...customerBody.Customer });
        expect.soft(body.ErrorMessage).toBe(null);
        expect.soft(body.IsSuccess).toBe(true);

        const response = await request.delete(
            apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(customerBody.Customer._id),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        expect.soft(response.status()).toBe(STATUS_CODES.DELETED);
    });

    test("[Controllers] Should get created customer by id", async ({ customersController, signInController }) => {
        const credential: ICredentials = {
            username: USER_LOGIN,
            password: USER_PASSWORD,
        };
        const loginResponse = await signInController.signIn(credential)

        const headers = loginResponse.headers;
        const token = headers["authorization"];
        validateResponse(loginResponse, STATUS_CODES.OK, true, null);

        const customerData = generateCustomerData();
        const customerResponse = await customersController.create(customerData, token);
        const id = customerResponse.body.Customer._id;

        validateResponse(customerResponse, STATUS_CODES.CREATED, true, null);

        const getResponse = await customersController.getById(id, token);
        validateResponse(getResponse, STATUS_CODES.OK, true, null);
        expect.soft(getResponse.body.Customer).toMatchObject({ ...customerData });
        validateSchema(customerSchema, getResponse.body);

        const response = await customersController.delete(id, token);
        expect.soft(response.status).toBe(STATUS_CODES.DELETED);
    });
});