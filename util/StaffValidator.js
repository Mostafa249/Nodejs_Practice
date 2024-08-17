const Ajv = require("ajv").default;

const validatorStaffschema = {
    "type": "object",
    "properties": {
        "first_name": {
            "type": "string",
            "minLength": 2,
            "maxLength": 50
        },
        "last_name": {
            "type": "string",
            "minLength": 2,
            "maxLength": 50

        },
        "department": {
            "type": "string",
            "minLength": 2,
            "maxLength": 50
        },
        "role": {
            "type": "string",
            "minLength": 2,
            "maxLength": 50
        },
        "phone_number": {
            "type": "string",
            "minLength": 8,
            "maxLength": 11
        },
    },
    "required": ["first_name", "last_name", "phone_number"],
    additionalProperties: false
}

const ajv = new Ajv();
module.exports = ajv.compile(validatorStaffschema);