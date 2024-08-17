const Ajv = require("ajv");

const authSchema = {
    "type": "object",
    "properties": {
        "email": {
            "type": "string",
            "pattern": ".+\@.+\..+"
        },
        "password": {
            "type": "string",
            "minLength": 8,
            "maxLength": 15 
        },
    },
    "required": ["email","password"],
    additionalProperties: false
}

const ajv = new Ajv();
module.exports = ajv.compile(authSchema);