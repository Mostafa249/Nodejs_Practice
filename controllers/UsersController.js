const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const config = require("config");
const asyncFunction = require("../midlewares/Async");

let addNewUser = asyncFunction(async (req, res) => {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (user) {
        res.status(400, "Bad Request").send("User already exist ");
    }
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role

    })
    if (!config.get("jwtsec")) {
        return res.status(500, "Server Error ").send("Request can't be fullfuled !");
    }
    await user
        .save();
    const token = await user.genAuthToken();
    res.header("x-auth-token", token);
    res.status(201, "Created").send({ name: user.name, email: user.email });
});

module.exports = {
    addNewUser
}