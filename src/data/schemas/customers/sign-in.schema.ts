export const signInSchema = {
    type: "object",
    properties: {
        Customer: {
            type: "object",
            properties: {
                _id: { type: "string" },
                username: { type: "string" },
                firstName: { type: "string" },
                lastName: { type: "string" },
                roles: { type: "number" },
                createdOn: { type: 'array', items: { type: 'string' }, },
            },
            required: ["_id", "username", "firstName", "lastName", "roles", "city", "createdOn"],
        },
        IsSuccess: { type: "boolean" },
        ErrorMessage: { type: ["string", "null"] },
    },
    required: ["User", "IsSuccess", "ErrorMessage"],
};