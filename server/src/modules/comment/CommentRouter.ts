import { Router, Request, Response } from "express";
import { CommentControllerContract } from "./types";

export function createCommentRouter(controllers: {
  commentController: CommentControllerContract;
}) {
  const router = Router();
  const { commentController } = controllers;

  //add a comment
  router.post("/add", async (req: Request, res: Response) => {
    const comment = await commentController.saveComment(
      req.body.comment,
      req.body.user,
      req.body.review
    );
    res.status(comment.statusCode).json(comment);
  });

  //delete a comment
  router.put("/delete", async (req: Request, res: Response) => {
    const comment = await commentController.deleteComment(req.body.commentId);
    res.status(comment.statusCode).json(comment);
  });

  return router;
}
