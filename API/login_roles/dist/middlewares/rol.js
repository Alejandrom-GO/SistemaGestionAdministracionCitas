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
exports.checkRole = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const checkRole = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { uI } = res.locals.jwtPayload;
        const userRepository = typeorm_1.getRepository(User_1.Users);
        let user;
        try {
            user = yield userRepository.findOneOrFail(uI);
        }
        catch (e) {
            return res.status(401).json({ message: 'Not Authorized' });
        }
        //check
        const { role } = user;
        if (roles.includes(role)) {
            next();
        }
        else {
            res.status(401).json({ message: 'Not Authorized role' });
        }
    });
};
exports.checkRole = checkRole;
//# sourceMappingURL=rol.js.map