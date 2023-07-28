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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Review_1 = require("../Review/Review");
const Book_1 = require("../Book/Book");
const Collection_1 = require("../Collection/Collection");
let User = User_1 = class User {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("varchar", { length: 36 }),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], User.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "goal", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "readbooks", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], User.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], User.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], User.prototype, "imageLink", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1),
    (0, typeorm_1.JoinTable)({
        name: "followerfollowing",
        joinColumn: {
            name: "followingId",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "followerId",
            referencedColumnName: "id",
        },
    }),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Review_1.Review, (review) => review.user, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], User.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Review_1.Review, (comment) => comment.user, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Book_1.Book, (book) => book.users, {
        onUpdate: "CASCADE",
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], User.prototype, "currentread", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "progress", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Collection_1.Collection, (collection) => collection.user, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], User.prototype, "collections", void 0);
User = User_1 = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
