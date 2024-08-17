const Ajv = require("ajv").default;

const validatorStudentsschema = {
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
    },
    "required": ["first_name", "last_name"],
    additionalProperties: false
}

const ajv = new Ajv();
module.exports = ajv.compile(validatorStudentsschema);