"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rol_1 = require("./../middlewares/rol");
const jwt_1 = require("./../middlewares/jwt");
const express_1 = require("express");
const DatesController_1 = require("../controller/DatesController");
const router = express_1.Router();
//ver todas las citas
router.get('/dates-all', [jwt_1.checkJwt, rol_1.checkRole(['admin', 'user', 'adminArea'])], DatesController_1.default.getAll);
//crear cita
router.post('/', [jwt_1.checkJwt, rol_1.checkRole(['admin', 'user', 'adminArea'])], DatesController_1.default.newDate);
//buscarCita
router.get('/:id', [jwt_1.checkJwt, rol_1.checkRole(['admin', 'user', 'adminArea'])], DatesController_1.default.getById);
//editarcitas
router.put('/:id', [jwt_1.checkJwt, rol_1.checkRole(['admin', 'adminArea'])], DatesController_1.default.edit);
//borrarCitas
router.delete('/:id', [jwt_1.checkJwt, rol_1.checkRole(['admin', 'user', 'adminArea'])], DatesController_1.default.delete);
exports.default = router;
//# sourceMappingURL=date.js.map