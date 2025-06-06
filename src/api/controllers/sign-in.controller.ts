import {RequestApi} from "../apiClients/request";
import {ICredentials, ISignInResponse} from "../../types/user.types";
import {IRequestOptions} from "../../types/api.types";
import {apiConfig} from "../../config/api-config";

export class SignInController {
    constructor(private request = new RequestApi()) {}

    async signIn(body: ICredentials) {
        const options: IRequestOptions = {
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