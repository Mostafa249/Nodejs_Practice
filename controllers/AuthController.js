
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const config = require("config");
const asyncFunction = require("../midlewares/Async");

let validateUser = asyncFunction(async (req, res) => {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
        return res.status(401, "Unauthorized").send("Invalid Email or Password");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(401, "Unauthorized").send("Invalid Email or Password");
    }
    if (!config.get("jwtsec")) {
        return res.status(500, "Server Error ").send("Request can't be fullfuled !");
    }
    const token = user.genAuthToken();

    res.header("x-auth-token", token);
    res.status(200, "OK").send("Logedin sucessfully ");
});

module.exports = {
    validateUser
}