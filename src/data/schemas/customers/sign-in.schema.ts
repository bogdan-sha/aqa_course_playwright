export const signInSchema = {
    type: "object",
    properties: {
        User: {
            type: "object",
            properties: {
                _id: { type: "string" },
                username: { type: "string" },
                firstName: { type: "string" },
                lastName: { type: "string" },
                roles: {
                    type: "array",
                    items: { type: "string" },
                },
                createdOn: { type: "string" },
            },
            required: ["_id", "username", "firstName", "lastName", "roles", "createdOn"],
        },
        IsSuccess: { type: "boolean" },
        ErrorMessage: { type: ["string", "null"] },
    },
    required: ["User", "IsSuccess", "ErrorMessage"],
};