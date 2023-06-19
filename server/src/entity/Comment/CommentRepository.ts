import { DeleteResult, InsertResult, QueryBuilder, Repository } from "typeorm";
import { Review } from "../Review/Review";
import { AppDataSource } from "../../lib/database";
import { User } from "../User";
import { Book } from "../Book";
import { Comment } from "./Comment";

export interface CommentRepositoryContract {
  saveComment(comment: string, user: User, review: Review): Promise<Comment>;
  deleteComment(id: string): Promise<DeleteResult>;
  getCount(id: string): Promise<number>;
  getCommentByReview(id: string): Promise<Comment[]>;
}

export class CommentRepository implements CommentRepositoryContract {
  private repository: Repository<Comment>;

  constructor() {
    this.repository = AppDataSource.getRepository(Comment);
  }

  saveComment(comment: string, user: User, review: Review): Promise<Comment> {
    const newComment = this.repository.create({
      comment: comment,
    });
    newComment.user = user;
    newComment.review = review;
    return this.repository.save(newComment);
  }

  deleteComment(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id: id });
  }

  getCount(id: string): Promise<number> {
    const queryBuilder = this.repository
      .createQueryBuilder("comment")
      .where("comment.reviewId = :idOne", { idOne: id })
      .getCount();

    return queryBuilder;
  }

  getCommentByReview(id: string): Promise<Comment[]> {
    const queryBuilder = this.repository
      .createQueryBuilder("comment")
      .where("comment.reviewId = :idOne", { idOne: id })
      .getMany();

    return queryBuilder;
  }
}
