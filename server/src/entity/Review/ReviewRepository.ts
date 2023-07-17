import { DeleteResult, InsertResult, QueryBuilder, Repository } from "typeorm";
import { Review } from "./Review";
import { AppDataSource } from "../../lib/database";
import { User } from "../User";
import { Book } from "../Book";

export interface ReviewRepositoryContract {
  getAllReviews(): Promise<Review[]>;
  saveReview(
    review: string,
    book: Book,
    user: User,
    rating: number
  ): Promise<Review>;
  getReviewByReview(review: string): Promise<Review>;
  getReviewByUser(id: string): Promise<Review[]>;
  getReviewByUsersFriends(id: string): Promise<Review[]>;
  updateReview(Review: Review): Promise<Review>;
  getReviewByBook(id: string): Promise<Review[]>;
  getReviewById(id: string): Promise<Review>;
  deleteReview(id: string): Promise<DeleteResult>;
}

export class ReviewRepository implements ReviewRepositoryContract {
  private repository: Repository<Review>;

  constructor() {
    this.repository = AppDataSource.getRepository(Review);
  }

  getAllReviews(): Promise<Review[]> {
    return this.repository.find();
  }

  getReviewByReview(review: string): Promise<Review> {
    return this.repository.findOneOrFail({
      where: {
        review: review,
      },
    });
  }

  getReviewByUser(id: string): Promise<Review[]> {
    const queryBuilder = this.repository
      .createQueryBuilder("review")
      .innerJoinAndSelect("review.book", "book")
      .innerJoinAndSelect("review.user", "user")
      .where("review.userId = :idOne", { idOne: id })
      .getMany();

    return queryBuilder;
  }

  getReviewByBook(id: string): Promise<Review[]> {
    const queryBuilder = this.repository
      .createQueryBuilder("review")
      .leftJoinAndSelect("review.user", "user")
      .leftJoinAndSelect("review.book", "book")
      .where("review.bookId = :idOne", { idOne: id })
      .getMany();

    return queryBuilder;
  }

  getReviewByUsersFriends(id: string): Promise<Review[]> {
    const queryBuilder = this.repository
      .createQueryBuilder("review")
      .innerJoinAndSelect("review.userId", "user")
      .innerJoinAndSelect("user.followers", "followers")
      .where("followers.id = :idOne", { idOne: id })
      .getMany();

    return queryBuilder;
  }

  saveReview(
    review: string,
    book: Book,
    user: User,
    rating: number
  ): Promise<Review> {
    const post = this.repository.create({
      review: review,
      rating: rating,
    });
    post.book = book;
    post.user = user;
    return this.repository.save(post);
  }

  updateReview(Review: Review): Promise<Review> {
    return this.repository.save(Review);
  }

  getReviewById(id: string): Promise<Review> {
    const queryBuilder = this.repository
      .createQueryBuilder("review")
      .where("review.id = :idOne", { idOne: id })
      .getOneOrFail();

    return queryBuilder;
  }

  deleteReview(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id: id });
  }
}
