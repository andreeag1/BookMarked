"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
class CommentService {
    constructor(commentRepository, userRepository, reviewRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
    }
    async saveComment(comment, userId, reviewId) {
        const user = await this.userRepository.getUserById(userId);
        const review = await this.reviewRepository.getReviewById(reviewId);
        return this.commentRepository.saveComment(comment, user, review);
    }
    deleteComment(id) {
        return this.commentRepository.deleteComment(id);
    }
    getCount(id) {
        return this.commentRepository.getCount(id);
    }
    getCommentByReview(id) {
        return this.commentRepository.getCommentByReview(id);
    }
}
exports.CommentService = CommentService;
