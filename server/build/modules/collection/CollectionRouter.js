"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCollectionRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../../lib/middlewares");
function createCollectionRouter(controllers) {
    const router = (0, express_1.Router)();
    const { collectionController } = controllers;
    //Add a collection DONE
    router.post("/add", middlewares_1.authenticate, async (req, res) => {
        const existingCollection = await collectionController.getCollection(req.body.userId, req.body.title);
        if (existingCollection == null) {
            const collection = await collectionController.saveCollection(req.body.title, req.body.userId);
            res.status(collection.statusCode).json(collection);
        }
        else {
            res.status(404).json({
                statusCode: 404,
                message: "This collection already exists",
            });
        }
    });
    //Add book to collection DONE
    router.post("/book", middlewares_1.authenticate, async (req, res) => {
        const newBook = await collectionController.saveBookToCollection(req.body.collectionId, req.body.bookId);
        res.status(newBook.statusCode).json(newBook);
    });
    //delete book from collection DONE
    router.put("/deletebook", middlewares_1.authenticate, async (req, res) => {
        const newBook = await collectionController.deleteBookFromCollection(req.body.collectionId, req.body.bookId);
        res.status(newBook.statusCode).json(newBook);
    });
    //delete collection
    router.put("/delete", middlewares_1.authenticate, async (req, res) => {
        const collection = await collectionController.deleteCollection(req.body.collectionId);
        res.status(collection.statusCode).json(collection);
    });
    //get a user's collections DONE
    router.get("/user/:id", middlewares_1.authenticate, async (req, res) => {
        const collections = await collectionController.getCollectionByUser(req.params.id);
        res.json(collections);
    });
    router.get("/get/:id", middlewares_1.authenticate, async (req, res) => {
        const collections = await collectionController.getCollectionById(req.params.id);
        res.json(collections);
    });
    //get a collection by title and user id DONE
    router.get("/:id/:title", middlewares_1.authenticate, async (req, res) => {
        const collection = await collectionController.getCollection(req.params.id, req.params.title);
        res.json(collection);
    });
    return router;
}
exports.createCollectionRouter = createCollectionRouter;
