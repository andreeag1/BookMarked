import { DeleteResult, InsertResult } from "typeorm";
import { Comment } from "../../entity/Comment";

export interface CommentControllerContract {
  saveComment(
    comment: string,
    userId: string,
    reviewId: string
  ): Promise<SaveCommentResponse>;

  deleteComment(id: string): Promise<SaveCommentResponse>;
  getCount(id: string): Promise<number>;
  getCommentByReview(id: string): Promise<Comment[]>;
}

export interface CommentServiceContract {
  saveComment(
    comment: string,
    userId: string,
    reviewId: string
  ): Promise<Comment>;

  deleteComment(id: string): Promise<DeleteResult>;
  getCount(id: string): Promise<number>;
  getCommentByReview(id: string): Promise<Comment[]>;
}

export type SaveCommentResponse = {
  statusCode: number;
  message: string;
};
