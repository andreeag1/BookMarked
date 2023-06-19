import { DeleteResult, InsertResult } from "typeorm";
import { Comment } from "../../entity/Comment";

export interface CommentControllerContract {
  saveComment(
    comment: string,
    userId: string,
    reviewId: string
  ): Promise<SaveCommentResponse>;

  deleteComment(id: string): Promise<SaveCommentResponse>;
}

export interface CommentServiceContract {
  saveComment(
    comment: string,
    userId: string,
    reviewId: string
  ): Promise<Comment>;

  deleteComment(id: string): Promise<DeleteResult>;
}

export type SaveCommentResponse = {
  statusCode: number;
  message: string;
};
