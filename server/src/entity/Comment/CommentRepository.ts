import { DeleteResult, InsertResult, QueryBuilder, Repository } from "typeorm";
import { Review } from "../Review/Review";
import { AppDataSource } from "../../lib/database";
import { User } from "../User";
import { Book } from "../Book";
import { Comment } from "./Comment";

export interface CommentRepositoryContract {
  saveComment(comment: string, user: User, review: Review): Promise<Comment>;
  deleteComment(id: string): Promise<DeleteResult>;
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
    // const queryBuilder = this.repository
    //   .createQueryBuilder("comment")
    //   .delete()
    //   .where("comment.id = :idOne", { idOne: id })
    //   .execute();

    // return queryBuilder;
  }
}
