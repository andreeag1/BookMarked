import { Router, Request, Response } from "express";
import { authenticate } from "../../lib/middlewares";
import { ReviewControllerContract } from "./types";
import { AuthControllerContract } from "../auth";
import { BookControllerContract } from "../book";

export function createReviewRouter(controllers: {
  reviewController: ReviewControllerContract;
  authController: AuthControllerContract;
  bookController: BookControllerContract;
}) {
  const router = Router();
  const { reviewController, authController, bookController } = controllers;

  //get all reviews
  router.get("/", async (req: Request, res: Response) => {
    const review = await reviewController.getAllReviews();
    res.json(review);
  });

  //save a review
  router.post("/add", async (req: Request, res: Response) => {
    const review = await reviewController.saveReview(
      req.body.review,
      req.body.bookId,
      req.body.userId
    );
    res.status(review.statusCode).json(review);
  });

  //get a user's reviews
  router.get("/user/:userId", async (req: Request, res: Response) => {
    const review = await reviewController.getReviewByUser(req.params.userId);
    return res.json(review);
  });

  //get a book's reviews
  router.get("/book/:bookId", async (req: Request, res: Response) => {
    const review = await reviewController.getReviewByBook(req.params.bookId);
    return res.json(review);
  });

  //add like
  router.put("/like", async (req: Request, res: Response) => {
    const review = await reviewController.getReviewById(req.body.id);
    review.likes++;
    const newReview = await reviewController.updateReview(review);
    return res.json(newReview);
  });

  //remove like
  router.put("/unlike", async (req: Request, res: Response) => {
    const review = await reviewController.getReviewById(req.body.id);
    review.likes--;
    const newReview = await reviewController.updateReview(review);
    return res.json(newReview);
  });

  //delete review
  router.put("/delete", async (req: Request, res: Response) => {
    const review = await reviewController.deleteReview(req.body.reviewId);
    res.status(review.statusCode).json(review);
  });

  return router;
}
