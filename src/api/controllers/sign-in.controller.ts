import { APIRequestContext } from "@playwright/test";
import { RequestApi } from "api/apiClients/request";
import { apiConfig } from "config/api-config";
import { ICredentials, ISignInResponse } from "../../types/user.types";
import { IRequestOptions } from "types/api.types";


export class SignInController {
    private request: RequestApi;

    constructor(context: APIRequestContext) {
        this.request = new RequestApi(context);
    }

    async signIn(body: ICredentials) {
        const options: IRequestOptions = {
            baseURL: apiConfig.BASE_URL,
            url: apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN,
            method: 'post',
            headers: {
                'content-type': 'application/json',
            },
            data: body,
        };
        return await this.request.send<ISignInResponse>(options);
    }
}