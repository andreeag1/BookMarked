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
exports.Collection = void 0;
const typeorm_1 = require("typeorm");
const Book_1 = require("../Book/Book");
const User_1 = require("../User/User");
let Collection = class Collection {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("varchar", { length: 36 }),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], Collection.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 500 }),
    __metadata("design:type", String)
], Collection.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Book_1.Book, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Collection.prototype, "books", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.collections, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_1.User)
], Collection.prototype, "user", void 0);
Collection = __decorate([
    (0, typeorm_1.Entity)()
], Collection);
exports.Collection = Collection;
