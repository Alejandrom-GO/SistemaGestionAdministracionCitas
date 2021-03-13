"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("./../controller/UserController");
const express_1 = require("express");
const jwt_1 = require("../middlewares/jwt");
const rol_1 = require("../middlewares/rol");
const router = express_1.Router();
// Get all users
router.get('/', [jwt_1.checkJwt, rol_1.checkRole(['admin'])], UserController_1.UserController.getAll);
// Get one user
router.get('/:id', [jwt_1.checkJwt, rol_1.checkRole(['admin'])], UserController_1.UserController.getById);
// Create a new user
router.post('/', UserController_1.UserController.new);
// Edit user
router.patch('/:id', [jwt_1.checkJwt, rol_1.checkRole(['admin'])], UserController_1.UserController.edit);
// Delete
router.delete('/:id', [jwt_1.checkJwt, rol_1.checkRole(['admin'])], UserController_1.UserController.delete);
exports.default = router;
//# sourceMappingURL=user.js.map