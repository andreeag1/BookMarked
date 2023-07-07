import { Router, Request, Response } from "express";
import { authenticate } from "../../lib/middlewares";
import { BookControllerContract } from "./types";

export function createBookRouter(controllers: {
  bookController: BookControllerContract;
}) {
  const router = Router();
  const { bookController } = controllers;

  //add a book
  router.post("/add", async (req: Request, res: Response) => {
    const response = await bookController.saveBook(
      req.body.title,
      req.body.author,
      req.body.imageLink
    );
    res.json(response);
  });

  router.get("/search/:imagelink", async (req: Request, res: Response) => {
    const imageLink = req.params.imagelink.split("_").join("/");
    const book = await bookController.getBookByImg(imageLink);
    if (book == null) {
      res.sendStatus(404);
      return null;
    }
    res.json(book);
  });

  return router;
}
