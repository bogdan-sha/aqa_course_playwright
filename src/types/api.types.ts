export interface IRequestOptions {
    baseURL: string;
    url: string;
    method: "get" | "post" | "put" | "delete";
    data?: object;
    headers?: Record<string, string>;
}

export interface IResponse<T extends object | null> {
    status: number;
    headers: Record<string, string>; // у Толи объект
    body: T;
}

export interface IResponseFields {
    IsSuccess: boolean;
    ErrorMessage: string | null;
}

export type sortDirection = "asc" | "desc";

export type customersSortField = "createdOn" | "email" | "name" | "country";

export type productsSortField = "createdOn" | "name" | "price" | "manufacturer";