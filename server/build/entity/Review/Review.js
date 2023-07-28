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
var Review_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../User/User");
const Book_1 = require("../Book/Book");
let Review = Review_1 = class Review {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("varchar", { length: 36 }),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], Review.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 500 }),
    __metadata("design:type", String)
], Review.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 500 }),
    __metadata("design:type", String)
], Review.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.reviews, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_1.User)
], Review.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Review.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Book_1.Book, (book) => book.reviews, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "bookId" }),
    __metadata("design:type", Book_1.Book)
], Review.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Review_1, (comment) => comment.review, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", Array)
], Review.prototype, "comments", void 0);
Review = Review_1 = __decorate([
    (0, typeorm_1.Entity)()
], Review);
exports.Review = Review;
