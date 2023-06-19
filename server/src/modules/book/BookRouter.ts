import { Router, Request, Response } from "express";
import { authenticate } from "../../lib/middlewares";
import { BookControllerContract } from "./types";

export function createBookRouter(controllers: {
  bookController: BookControllerContract;
}) {
  const router = Router();
  const { bookController } = controllers;

  router.get("/", async (req: Request, res: Response) => {
    const book = await bookController.getAllBooks();
    res.json(book);
  });

  router.post("/add", async (req: Request, res: Response) => {
    const response = await bookController.saveBook(
      req.body.title,
      req.body.author,
      req.body.description,
      req.body.imageLink
    );
    res.status(response.statusCode).json(response);
  });

  return router;
}
