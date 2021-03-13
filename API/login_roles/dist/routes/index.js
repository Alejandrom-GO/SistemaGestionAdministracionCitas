"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./auth");
const date_1 = require("./date");
const user_1 = require("./user");
const routes = express_1.Router();
routes.use('/auth', auth_1.default);
routes.use('/api', date_1.default);
routes.use('/users', user_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map