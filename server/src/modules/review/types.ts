import { DeleteResult, InsertResult } from "typeorm";
import { Review, User } from "../../entity";

export interface ReviewControllerContract {
  getAllReviews(): Promise<Review[]>;

  getReviewByReview(review: string): Promise<Review | null>;

  getReviewByUser(id: string): Promise<Review[]>;

  saveReview(
    review: string,
    bookId: string,
    userId: string,
    rating: number,
    date: string
  ): Promise<SaveReviewResponse>;

  updateReview(Review: Review): Promise<Review>;

  getReviewByBook(id: string): Promise<Review[]>;

  getReviewById(id: string): Promise<Review>;

  deleteReview(id: string): Promise<SaveReviewResponse>;
}

export interface ReviewServiceContract {
  getAllReviews(): Promise<Review[]>;

  getReviewByReview(review: string): Promise<Review | null>;

  getReviewByUser(id: string): Promise<Review[]>;

  saveReview(
    review: string,
    bookId: string,
    userId: string,
    rating: number,
    date: string
  ): Promise<Review>;

  updateReview(Review: Review): Promise<Review>;

  getReviewByBook(id: string): Promise<Review[]>;

  getReviewById(id: string): Promise<Review>;

  deleteReview(id: string): Promise<DeleteResult>;
}

export type SaveReviewResponse = {
  statusCode: number;
  message: string;
};
