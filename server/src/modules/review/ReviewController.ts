import { InsertResult } from "typeorm";
import { Review, User } from "../../entity";
import {
  ReviewControllerContract,
  ReviewServiceContract,
  SaveReviewResponse,
} from "./types";

export class ReviewController implements ReviewControllerContract {
  private reviewService: ReviewServiceContract;

  constructor(reviewService: ReviewServiceContract) {
    this.reviewService = reviewService;
  }

  getAllReviews(): Promise<Review[]> {
    return this.reviewService.getAllReviews();
  }

  getReviewByReview(review: string): Promise<Review | null> {
    return this.reviewService.getReviewByReview(review);
  }

  getReviewByUser(id: string): Promise<Review[]> {
    return this.reviewService.getReviewByUser(id);
  }

  getReviewByBook(id: string): Promise<Review[]> {
    return this.reviewService.getReviewByBook(id);
  }

  saveReview(
    review: string,
    bookId: string,
    userId: string,
    rating: number
  ): Promise<SaveReviewResponse> {
    this.reviewService.saveReview(review, bookId, userId, rating);
    return new Promise<SaveReviewResponse>((resolve, reject) => {
      resolve({
        statusCode: 200,
        message: "success",
      });
    });
  }

  updateReview(Review: Review): Promise<Review> {
    return this.reviewService.updateReview(Review);
  }

  getReviewById(id: string): Promise<Review> {
    return this.reviewService.getReviewById(id);
  }

  deleteReview(id: string): Promise<SaveReviewResponse> {
    this.reviewService.deleteReview(id);
    return new Promise<SaveReviewResponse>((resolve, reject) => {
      resolve({
        statusCode: 200,
        message: "success",
      });
    });
  }
}
