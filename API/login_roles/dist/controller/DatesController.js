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
exports.DatesController = void 0;
const Dates_1 = require("./../entity/Dates");
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const class_validator_1 = require("class-validator");
class DatesController {
}
exports.DatesController = DatesController;
DatesController.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const datesRepository = typeorm_1.getRepository(Dates_1.Dates);
    let dates;
    try {
        dates = yield datesRepository.find({ relations: ["user"] });
    }
    catch (e) {
        res.status(404).json({ code: 404, message: 'Somenthing goes wrong dates error!' });
    }
    if (dates.length > 0) {
        res.send(dates);
    }
    else {
        res.status(404).json({ code: 404, message: 'Not result' });
    }
});
DatesController.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ code: 400, message: 'Date not found' });
    }
    const datesRepository = typeorm_1.getRepository(Dates_1.Dates);
    const userRepository = typeorm_1.getRepository(User_1.Users);
    try {
        const date = yield datesRepository.findOneOrFail(id, { relations: ["user"] });
        res.send(date);
    }
    catch (e) {
        res.status(404).json({ code: 404, message: 'Not result' });
    }
});
DatesController.newDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { asunto, descripcion, forario, fecha, area, estado, userId } = req.body;
    const date = new Dates_1.Dates();
    const userRepository = typeorm_1.getRepository(User_1.Users);
    try {
        const user = yield userRepository.findOneOrFail(userId);
        date.asunto = asunto;
        date.descripcion = descripcion;
        date.forario = forario;
        date.fecha = fecha;
        date.area = area;
        date.estado = estado;
        date.user = userId;
    }
    catch (e) {
        res.status(404).json({ code: 404, message: 'User not found' });
    }
    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = yield class_validator_1.validate(date, validationOpt);
    if (errors.length > 0) {
        return res.status(400).json({ code: 400, message: 'All data is required', errors: errors });
    }
    const dateRepository = typeorm_1.getRepository(Dates_1.Dates);
    try {
        yield dateRepository.save(date);
    }
    catch (e) {
        return res.status(409).send(e);
    }
    // All ok
    res.status(201).json({ code: 201, message: 'Date created' });
});
DatesController.edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let date;
    const { id } = req.params;
    const { asunto, descripcion, forario, fecha, area, estado, userId } = req.body;
    const dateRepository = typeorm_1.getRepository(Dates_1.Dates);
    // Try get user
    try {
        date = yield dateRepository.findOneOrFail(id);
        date.asunto = asunto;
        date.descripcion = descripcion;
        date.forario = forario;
        date.fecha = fecha;
        date.area = area;
        date.estado = estado;
        date.user = userId;
    }
    catch (e) {
        return res.status(404).json({ code: 404, message: 'Date not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = yield class_validator_1.validate(date, validationOpt);
    if (errors.length > 0) {
        return res.status(400).json({ code: 400, message: 'All data is required', errors: errors });
    }
    // Try to save user
    try {
        yield dateRepository.save(date);
    }
    catch (e) {
        return res.status(409).json({ code: 409, message: 'Date already in use' });
    }
    res.status(201).json({ code: 201, message: 'Date update' });
});
DatesController.delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const dateRepository = typeorm_1.getRepository(Dates_1.Dates);
    let date;
    try {
        date = yield dateRepository.findOneOrFail(id);
    }
    catch (e) {
        return res.status(404).json({ code: 404, message: 'Date not found' });
    }
    // Remove user
    dateRepository.delete(id);
    res.status(201).json({ code: 201, message: ' Date deleted' });
});
exports.default = DatesController;
//# sourceMappingURL=DatesController.js.map