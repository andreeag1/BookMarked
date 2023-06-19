import { InsertResult } from "typeorm";
import { Review, User } from "../../entity";

export interface ReviewControllerContract {
  getAllReviews(): Promise<Review[]>;

  getReviewByReview(review: string): Promise<Review | null>;

  getReviewByUser(id: string): Promise<Review[]>;

  saveReview(
    review: string,
    bookId: string,
    userId: string
  ): Promise<SaveReviewResponse>;

  updateReview(Review: Review): Promise<Review>;

  getReviewByBook(id: string): Promise<Review[]>;

  getReviewById(id: string): Promise<Review>;
}

export interface ReviewServiceContract {
  getAllReviews(): Promise<Review[]>;

  getReviewByReview(review: string): Promise<Review | null>;

  getReviewByUser(id: string): Promise<Review[]>;

  saveReview(review: string, bookId: string, userId: string): Promise<Review>;

  updateReview(Review: Review): Promise<Review>;

  getReviewByBook(id: string): Promise<Review[]>;

  getReviewById(id: string): Promise<Review>;
}

export type SaveReviewResponse = {
  statusCode: number;
  message: string;
};
