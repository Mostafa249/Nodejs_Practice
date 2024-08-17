const jwt = require('jsonwebtoken');
const config = require('config');

let adminAuth = (req, res, nxt) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401, "Unautohrized").send("Access Denied.");
    }
    try {
        const decodedPayload = jwt.verify(token, config.get('jwtsec'));
        if (decodedPayload.userRole !== "admin") {
            return res.status(403, "Forbiden ").send("User is not authorized ")
        }
        nxt();
    }
    catch (err) {
        res.status(401, "Unauthorized").send("Invalid token")
    }
};

let adminOrStaffAuth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return res.status(401, "Unautohrized").send("Access Denied.");
        }
        const decodedPayload = jwt.verify(token, config.get('jwtsec'));
        if (decodedPayload.userRole === "admin") {
            return next();
        }
        if (decodedPayload.userRole === "staff") { return next() }
        res.status(403).send('Access denied: Admins or Staff only');
    }
    catch (err) {
        res.status(401, "Unauthorized").send("Invalid token")
    }
}

module.exports = {
    adminAuth,
    adminOrStaffAuth
}