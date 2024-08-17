const mongoose = require("mongoose");
valid = require("validator");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (val) => { return valid.isEmail(val) },
            message: "{Value} is not valid email"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "staff"],
        default: "staff",
    }
},
    {
        collection: "users"
    });

userSchema.method("genAuthToken", function () {
    const token = jwt.sign({
        userId: this._id,
        userRole: this.role
    },
        config.get("jwtsec"));
    return token;
});
module.exports = mongoose.model("users", userSchema);   