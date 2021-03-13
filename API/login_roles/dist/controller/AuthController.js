"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
class AuthController {
}
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!(username && password)) {
        return res.status(400).json({ code: 400, message: 'Username & Password are required!' });
    }
    const userRepository = typeorm_1.getRepository(User_1.Users);
    let user;
    try {
        user = yield userRepository.findOneOrFail({ where: { username } });
    }
    catch (error) {
        return res.status(400).json({ code: 405, message: 'Username or Password incorrect' });
    }
    //Check Password
    if (!user.checkPassword(password)) {
        return res.status(400).json({ code: 400, message: 'Username or Password incorrect' });
    }
    const token = jwt.sign({ userId: user.id, username: user.username }, config_1.default.jwtSecret, { expiresIn: '1h' });
    const usrs = yield userRepository.findOneOrFail(user.id, { relations: ["typeUser"] });
    res.send({ code: 200, message: 'OK', token, role: usrs.typeUser.role, area: usrs.area, mat: usrs.username });
});
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map