"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../../lib/middlewares");
function createReviewRouter(controllers) {
    const router = (0, express_1.Router)();
    const { reviewController, authController, bookController } = controllers;
    //get all reviews
    router.get("/", async (req, res) => {
        const review = await reviewController.getAllReviews();
        res.json(review);
    });
    //save a review DONE
    router.post("/add", middlewares_1.authenticate, async (req, res) => {
        if (req.body.rating <= 5) {
            const date = new Date();
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const format = month + "/" + day + "/" + year;
            const review = await reviewController.saveReview(req.body.review, req.body.bookId, req.body.userId, req.body.rating, format);
            res.status(review.statusCode).json(review);
        }
        else {
            return res.status(403).send({
                message: "Rating must be 5 or less",
            });
        }
    });
    //get a user's reviews DONE
    router.get("/user/:userId", middlewares_1.authenticate, async (req, res) => {
        const review = await reviewController.getReviewByUser(req.params.userId);
        return res.json(review);
    });
    //get a book's reviews DONE
    router.get("/book/:bookId", async (req, res) => {
        const review = await reviewController.getReviewByBook(req.params.bookId);
        return res.json(review);
    });
    //add like DONE
    router.put("/like", middlewares_1.authenticate, async (req, res) => {
        const review = await reviewController.getReviewById(req.body.id);
        review.likes++;
        const newReview = await reviewController.updateReview(review);
        return res.json(newReview);
    });
    //remove like DONE
    router.put("/unlike", middlewares_1.authenticate, async (req, res) => {
        const review = await reviewController.getReviewById(req.body.id);
        review.likes--;
        const newReview = await reviewController.updateReview(review);
        return res.json(newReview);
    });
    //get review by id DONE
    router.get("/:id", async (req, res) => {
        const review = await reviewController.getReviewById(req.params.id);
        return res.json(review);
    });
    //delete review DONE
    router.put("/delete", middlewares_1.authenticate, async (req, res) => {
        const review = await reviewController.deleteReview(req.body.reviewId);
        res.status(review.statusCode).json(review);
    });
    return router;
}
exports.createReviewRouter = createReviewRouter;
