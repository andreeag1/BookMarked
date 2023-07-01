import { Router, Request, Response } from "express";
import { CollectionControllerContract } from "./types";

export function createCollectionRouter(controllers: {
  collectionController: CollectionControllerContract;
}) {
  const router = Router();
  const { collectionController } = controllers;

  //Add a collection DONE
  router.post("/add", async (req: Request, res: Response) => {
    const collection = await collectionController.saveCollection(
      req.body.title,
      req.body.userId
    );
    res.status(collection.statusCode).json(collection);
  });

  //Add book to colleciton
  router.post("/book", async (req: Request, res: Response) => {
    const newBook = await collectionController.saveBookToCollection(
      req.body.collectionId,
      req.body.bookId
    );
    res.status(newBook.statusCode).json(newBook);
  });

  //delete book from collection
  router.put("/deletebook", async (req: Request, res: Response) => {
    const newBook = await collectionController.deleteBookFromCollection(
      req.body.collectionId,
      req.body.bookId
    );
    res.status(newBook.statusCode).json(newBook);
  });

  //delete collection
  router.put("/delete", async (req: Request, res: Response) => {
    const collection = await collectionController.deleteCollection(
      req.body.collectionId
    );
    res.status(collection.statusCode).json(collection);
  });

  //get a user's collections DONE
  router.get("/:id", async (req: Request, res: Response) => {
    const collections = await collectionController.getCollectionByUser(
      req.params.id
    );
    res.json(collections);
  });

  return router;
}
