const Ajv = require("ajv");

const validatorClassroomsSchema = {
    "type": "object",
    "properties": {
        "building": {
            "type": "string",
            "minLength": 5,
            "maxLength": 50
        },
        "room_number": {
            "type": "string",
            "minLength": 1,
            "maxLength": 50

        },
        "capacity": {
            "type": "number",
            "minimum": 10,
            "maximum": 100
        },
    },
    "required": ["building", "room_number", "capacity"],
    additionalProperties: false
}

const ajv = new Ajv();
module.exports = ajv.compile(validatorClassroomsSchema);