const Ajv = require("ajv").default;

const usersSchema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "pattern": "^[A-Z][a-z*$]",
            "minLength": 2,
            "maxLength": 50
        },
        "email": {
            "type": "string",
            "pattern": ".+\@.+\..+"
        },
        "password": {
            "type": "string",
            "minLength": 8,
            "maxLength": 15
        },
        "role":{
            "type": "string",
            "enum":["admin","staff"]
        }
    },
    "required": ["name", "password", "email"],
    additionalProperties: false
}


const ajv = new Ajv();
module.exports = ajv.compile(usersSchema);