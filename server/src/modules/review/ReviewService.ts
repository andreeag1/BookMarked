import { DeleteResult, InsertResult } from "typeorm";
import { Review, ReviewRepositoryContract } from "../../entity/Review";
import { ReviewServiceContract } from "./types";
import { AuthServiceContract } from "../auth";
import { BookRepositoryContract, UserRepositoryContract } from "../../entity";
import { User } from "../../entity";

export class ReviewService implements ReviewServiceContract {
  private reviewRepository: ReviewRepositoryContract;
  private userRepository: UserRepositoryContract;
  private bookRepository: BookRepositoryContract;

  constructor(
    reviewRepository: ReviewRepositoryContract,
    userRepository: UserRepositoryContract,
    bookRepository: BookRepositoryContract
  ) {
    this.reviewRepository = reviewRepository;
    this.userRepository = userRepository;
    this.bookRepository = bookRepository;
  }

  getAllReviews(): Promise<Review[]> {
    return this.reviewRepository.getAllReviews();
  }

  getReviewByReview(review: string): Promise<Review | null> {
    return this.reviewRepository.getReviewByReview(review);
  }

  getReviewByUser(id: string): Promise<Review[]> {
    return this.reviewRepository.getReviewByUser(id);
  }

  async saveReview(
    review: string,
    bookId: string,
    userId: string,
    rating: number,
    date: string
  ): Promise<Review> {
    const user = await this.userRepository.getUserById(userId);
    const book = await this.bookRepository.getBookById(bookId);
    return this.reviewRepository.saveReview(review, book, user, rating, date);
  }

  updateReview(Review: Review): Promise<Review> {
    return this.reviewRepository.updateReview(Review);
  }

  getReviewByBook(id: string): Promise<Review[]> {
    return this.reviewRepository.getReviewByBook(id);
  }

  getReviewById(id: string): Promise<Review> {
    return this.reviewRepository.getReviewById(id);
  }

  deleteReview(id: string): Promise<DeleteResult> {
    return this.reviewRepository.deleteReview(id);
  }
}
