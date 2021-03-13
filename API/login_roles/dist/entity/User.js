"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const bcrypt = require("bcryptjs");
const Dates_1 = require("./Dates");
const typesUsers_1 = require("./typesUsers");
let Users = class Users {
    hashPassword() {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    checkPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Users.prototype, "area", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], Users.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.MinLength(4),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Users.prototype, "role", void 0);
__decorate([
    typeorm_1.ManyToOne(() => typesUsers_1.TypesUser, typeUser => typeUser.typesU),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Users)
], Users.prototype, "typeUser", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Users.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => Dates_1.Dates, dates => dates.user),
    __metadata("design:type", Array)
], Users.prototype, "dates", void 0);
Users = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(['username'])
], Users);
exports.Users = Users;
//# sourceMappingURL=User.js.map