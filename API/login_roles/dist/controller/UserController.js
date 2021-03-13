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
exports.UserController = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const class_validator_1 = require("class-validator");
class UserController {
}
exports.UserController = UserController;
UserController.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_1.getRepository(User_1.Users);
    let users;
    try {
        users = yield userRepository.find();
    }
    catch (e) {
        res.status(404).json({ code: 404, message: 'Somenthing goes wrong!' });
    }
    if (users.length > 0) {
        res.send(users);
    }
    else {
        res.status(404).json({ code: 404, message: 'Not result' });
    }
});
UserController.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userRepository = typeorm_1.getRepository(User_1.Users);
    try {
        const user = yield userRepository.findOneOrFail(id);
        res.send(user);
    }
    catch (e) {
        res.status(404).json({ code: 404, message: 'Not result' });
    }
});
UserController.new = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role, area, name, typeUser } = req.body;
    const user = new User_1.Users();
    user.username = username;
    user.password = password;
    user.role = role;
    user.area = area;
    user.name = name;
    user.typeUser = typeUser;
    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = yield class_validator_1.validate(user, validationOpt);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    // TODO: HASH PASSWORD
    const userRepository = typeorm_1.getRepository(User_1.Users);
    try {
        user.hashPassword();
        yield userRepository.save(user);
    }
    catch (e) {
        return res.status(409).json({ code: 409, message: 'Username already exist' });
    }
    // All ok
    res.status(201).json({ code: 201, message: 'User created' });
});
UserController.edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    const { id } = req.params;
    const { username, role } = req.body;
    const userRepository = typeorm_1.getRepository(User_1.Users);
    // Try get user
    try {
        user = yield userRepository.findOneOrFail(id);
        user.username = username;
        user.role = role;
    }
    catch (e) {
        return res.status(404).json({ code: 404, message: 'User not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = yield class_validator_1.validate(user, validationOpt);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    // Try to save user
    try {
        yield userRepository.save(user);
    }
    catch (e) {
        return res.status(409).json({ code: 409, message: 'Username already in use' });
    }
    res.status(201).json({ code: 201, message: 'User update' });
});
UserController.delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userRepository = typeorm_1.getRepository(User_1.Users);
    let user;
    try {
        user = yield userRepository.findOneOrFail(id);
    }
    catch (e) {
        return res.status(404).json({ code: 404, message: 'User not found' });
    }
    // Remove user
    userRepository.delete(id);
    res.status(201).json({ code: 201, message: ' User deleted' });
});
exports.default = UserController;
//# sourceMappingURL=UserController.js.map