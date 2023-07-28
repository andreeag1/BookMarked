"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRepository = void 0;
const Review_1 = require("./Review");
const database_1 = require("../../lib/database");
class ReviewRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(Review_1.Review);
    }
    getAllReviews() {
        return this.repository.find();
    }
    getReviewByReview(review) {
        return this.repository.findOneOrFail({
            where: {
                review: review,
            },
        });
    }
    getReviewByUser(id) {
        const queryBuilder = this.repository
            .createQueryBuilder("review")
            .innerJoinAndSelect("review.book", "book")
            .innerJoinAndSelect("review.user", "user")
            .where("review.userId = :idOne", { idOne: id })
            .getMany();
        return queryBuilder;
    }
    getReviewByBook(id) {
        const queryBuilder = this.repository
            .createQueryBuilder("review")
            .leftJoinAndSelect("review.user", "user")
            .leftJoinAndSelect("review.book", "book")
            .where("review.bookId = :idOne", { idOne: id })
            .getMany();
        return queryBuilder;
    }
    getReviewByUsersFriends(id) {
        const queryBuilder = this.repository
            .createQueryBuilder("review")
            .innerJoinAndSelect("review.userId", "user")
            .innerJoinAndSelect("user.followers", "followers")
            .where("followers.id = :idOne", { idOne: id })
            .getMany();
        return queryBuilder;
    }
    saveReview(review, book, user, rating, date) {
        const post = this.repository.create({
            review: review,
            rating: rating,
            date: date,
        });
        post.book = book;
        post.user = user;
        return this.repository.save(post);
    }
    updateReview(Review) {
        return this.repository.save(Review);
    }
    getReviewById(id) {
        const queryBuilder = this.repository
            .createQueryBuilder("review")
            .where("review.id = :idOne", { idOne: id })
            .getOneOrFail();
        return queryBuilder;
    }
    deleteReview(id) {
        return this.repository.delete({ id: id });
    }
}
exports.ReviewRepository = ReviewRepository;
