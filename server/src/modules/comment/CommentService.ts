import { DeleteResult, InsertResult } from "typeorm";
import { CommentServiceContract } from "./types";
import { CommentRepositoryContract } from "../../entity/Comment";
import { ReviewRepositoryContract, UserRepositoryContract } from "../../entity";
import { Comment } from "../../entity/Comment";

export class CommentService implements CommentServiceContract {
  private commentRepository: CommentRepositoryContract;
  private userRepository: UserRepositoryContract;
  private reviewRepository: ReviewRepositoryContract;

  constructor(
    commentRepository: CommentRepositoryContract,
    userRepository: UserRepositoryContract,
    reviewRepository: ReviewRepositoryContract
  ) {
    this.commentRepository = commentRepository;
    this.userRepository = userRepository;
    this.reviewRepository = reviewRepository;
  }

  async saveComment(
    comment: string,
    userId: string,
    reviewId: string
  ): Promise<Comment> {
    const user = await this.userRepository.getUserById(userId);
    const review = await this.reviewRepository.getReviewById(reviewId);
    return this.commentRepository.saveComment(comment, user, review);
  }

  deleteComment(id: string): Promise<DeleteResult> {
    return this.commentRepository.deleteComment(id);
  }
}
