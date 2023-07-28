"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
class ReviewService {
    constructor(reviewRepository, userRepository, bookRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }
    getAllReviews() {
        return this.reviewRepository.getAllReviews();
    }
    getReviewByReview(review) {
        return this.reviewRepository.getReviewByReview(review);
    }
    getReviewByUser(id) {
        return this.reviewRepository.getReviewByUser(id);
    }
    async saveReview(review, bookId, userId, rating, date) {
        const user = await this.userRepository.getUserById(userId);
        const book = await this.bookRepository.getBookById(bookId);
        return this.reviewRepository.saveReview(review, book, user, rating, date);
    }
    updateReview(Review) {
        return this.reviewRepository.updateReview(Review);
    }
    getReviewByBook(id) {
        return this.reviewRepository.getReviewByBook(id);
    }
    getReviewById(id) {
        return this.reviewRepository.getReviewById(id);
    }
    deleteReview(id) {
        return this.reviewRepository.deleteReview(id);
    }
}
exports.ReviewService = ReviewService;
