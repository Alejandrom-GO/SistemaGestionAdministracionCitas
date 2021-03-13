"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
const checkJwt = (req, res, next) => {
    const token = req.headers['auth'];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (e) {
        return res.status(401).json({ message: 'Not Authorized' });
    }
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, config_1.default.jwtSecret, { expiresIn: '1h' });
    res.setHeader('token', newToken);
    // Call next
    next();
};
exports.checkJwt = checkJwt;
//# sourceMappingURL=jwt.js.map