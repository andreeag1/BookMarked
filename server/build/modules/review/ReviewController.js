"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    getAllReviews() {
        return this.reviewService.getAllReviews();
    }
    getReviewByReview(review) {
        return this.reviewService.getReviewByReview(review);
    }
    getReviewByUser(id) {
        return this.reviewService.getReviewByUser(id);
    }
    getReviewByBook(id) {
        return this.reviewService.getReviewByBook(id);
    }
    saveReview(review, bookId, userId, rating, date) {
        this.reviewService.saveReview(review, bookId, userId, rating, date);
        return new Promise((resolve, reject) => {
            resolve({
                statusCode: 200,
                message: "success",
            });
        });
    }
    updateReview(Review) {
        return this.reviewService.updateReview(Review);
    }
    getReviewById(id) {
        return this.reviewService.getReviewById(id);
    }
    deleteReview(id) {
        this.reviewService.deleteReview(id);
        return new Promise((resolve, reject) => {
            resolve({
                statusCode: 200,
                message: "success",
            });
        });
    }
}
exports.ReviewController = ReviewController;
