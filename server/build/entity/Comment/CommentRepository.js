"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepository = void 0;
const database_1 = require("../../lib/database");
const Comment_1 = require("./Comment");
class CommentRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(Comment_1.Comment);
    }
    saveComment(comment, user, review) {
        const newComment = this.repository.create({
            comment: comment,
        });
        newComment.user = user;
        newComment.review = review;
        return this.repository.save(newComment);
    }
    deleteComment(id) {
        return this.repository.delete({ id: id });
    }
    getCount(id) {
        const queryBuilder = this.repository
            .createQueryBuilder("comment")
            .where("comment.reviewId = :idOne", { idOne: id })
            .getCount();
        return queryBuilder;
    }
    getCommentByReview(id) {
        const queryBuilder = this.repository
            .createQueryBuilder("comment")
            .innerJoinAndSelect("comment.user", "user")
            .where("comment.reviewId = :idOne", { idOne: id })
            .getMany();
        return queryBuilder;
    }
}
exports.CommentRepository = CommentRepository;
