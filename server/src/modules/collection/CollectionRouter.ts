import { Router, Request, Response } from "express";
import { CollectionControllerContract } from "./types";
import { authenticate } from "../../lib/middlewares";

export function createCollectionRouter(controllers: {
  collectionController: CollectionControllerContract;
}) {
  const router = Router();
  const { collectionController } = controllers;

  //Add a collection DONE
  router.post("/add", async (req: Request, res: Response) => {
    const existingCollection = await collectionController.getCollection(
      req.body.userId,
      req.body.title
    );
    if (existingCollection == null) {
      const collection = await collectionController.saveCollection(
        req.body.title,
        req.body.userId
      );
      res.status(collection.statusCode).json(collection);
    } else {
      res.status(404).json({
        statusCode: 404,
        message: "This collection already exists",
      });
    }
  });

  //Add book to collection DONE
  router.post("/book", authenticate, async (req: Request, res: Response) => {
    const newBook = await collectionController.saveBookToCollection(
      req.body.collectionId,
      req.body.bookId
    );
    res.status(newBook.statusCode).json(newBook);
  });

  //delete book from collection DONE
  router.put(
    "/deletebook",
    authenticate,
    async (req: Request, res: Response) => {
      const newBook = await collectionController.deleteBookFromCollection(
        req.body.collectionId,
        req.body.bookId
      );
      res.status(newBook.statusCode).json(newBook);
    }
  );

  //delete collection
  router.put("/delete", authenticate, async (req: Request, res: Response) => {
    const collection = await collectionController.deleteCollection(
      req.body.collectionId
    );
    res.status(collection.statusCode).json(collection);
  });

  //get a user's collections DONE
  router.get("/user/:id", authenticate, async (req: Request, res: Response) => {
    const collections = await collectionController.getCollectionByUser(
      req.params.id
    );
    res.json(collections);
  });

  router.get("/get/:id", authenticate, async (req: Request, res: Response) => {
    const collections = await collectionController.getCollectionById(
      req.params.id
    );
    res.json(collections);
  });

  //get a collection by title and user id DONE
  router.get(
    "/:id/:title",
    authenticate,
    async (req: Request, res: Response) => {
      const collection = await collectionController.getCollection(
        req.params.id,
        req.params.title
      );
      res.json(collection);
    }
  );

  return router;
}
