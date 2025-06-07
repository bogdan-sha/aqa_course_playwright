import { IResponseFields } from "./api.types";

export interface ICredentials {
    username: string;
    password: string;
}

export interface IUser {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    createdOn: string;
    roles: string[];
}

export interface ISignInResponse extends IResponseFields {
    User: IUser;
}