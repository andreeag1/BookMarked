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
exports.Book = void 0;
const typeorm_1 = require("typeorm");
const Review_1 = require("../Review/Review");
const User_1 = require("../User/User");
let Book = class Book {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("varchar", { length: 36 }),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], Book.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 255 }),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 255 }),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 255 }),
    __metadata("design:type", String)
], Book.prototype, "imageLink", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Review_1.Review, (review) => review.user, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Book.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => User_1.User, (user) => user.currentread, {
        onUpdate: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", Array)
], Book.prototype, "users", void 0);
Book = __decorate([
    (0, typeorm_1.Entity)()
], Book);
exports.Book = Book;
