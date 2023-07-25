import { Router, Request, Response } from "express";
import { CommentControllerContract } from "./types";
import { authenticate } from "../../lib/middlewares";

export function createCommentRouter(controllers: {
  commentController: CommentControllerContract;
}) {
  const router = Router();
  const { commentController } = controllers;

  //add a comment DONE
  router.post("/add", authenticate, async (req: Request, res: Response) => {
    const comment = await commentController.saveComment(
      req.body.comment,
      req.body.user,
      req.body.review
    );
    res.status(comment.statusCode).json(comment);
  });

  //delete a comment DONE
  router.put("/delete", authenticate, async (req: Request, res: Response) => {
    const comment = await commentController.deleteComment(req.body.commentId);
    res.status(comment.statusCode).json(comment);
  });

  //get count of comments DONE
  router.get("/count/:id", async (req: Request, res: Response) => {
    const count = await commentController.getCount(req.params.id);
    res.json(count);
  });

  //get a reviews comments DONE
  router.get("/review/:id", async (req: Request, res: Response) => {
    const comments = await commentController.getCommentByReview(req.params.id);
    res.json(comments);
  });

  return router;
}
