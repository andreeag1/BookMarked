import { DeleteResult, InsertResult } from "typeorm";
import {
  CommentServiceContract,
  CommentControllerContract,
  SaveCommentResponse,
} from "./types";
import { Comment } from "../../entity/Comment";

export class CommentController implements CommentControllerContract {
  private commentService: CommentServiceContract;

  constructor(commentService: CommentServiceContract) {
    this.commentService = commentService;
  }

  saveComment(
    comment: string,
    userId: string,
    reviewId: string
  ): Promise<SaveCommentResponse> {
    this.commentService.saveComment(comment, userId, reviewId);
    return new Promise<SaveCommentResponse>((resolve, reject) => {
      resolve({
        statusCode: 200,
        message: "success",
      });
    });
  }

  deleteComment(id: string): Promise<SaveCommentResponse> {
    this.commentService.deleteComment(id);
    return new Promise<SaveCommentResponse>((resolve, reject) => {
      resolve({
        statusCode: 200,
        message: "success",
      });
    });
  }

  getCount(id: string): Promise<number> {
    return this.commentService.getCount(id);
  }

  getCommentByReview(id: string): Promise<Comment[]> {
    return this.commentService.getCommentByReview(id);
  }
}
