"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    saveComment(comment, userId, reviewId) {
        this.commentService.saveComment(comment, userId, reviewId);
        return new Promise((resolve, reject) => {
            resolve({
                statusCode: 200,
                message: "success",
            });
        });
    }
    deleteComment(id) {
        this.commentService.deleteComment(id);
        return new Promise((resolve, reject) => {
            resolve({
                statusCode: 200,
                message: "success",
            });
        });
    }
    getCount(id) {
        return this.commentService.getCount(id);
    }
    getCommentByReview(id) {
        return this.commentService.getCommentByReview(id);
    }
}
exports.CommentController = CommentController;
