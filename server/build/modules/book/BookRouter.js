"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../../lib/middlewares");
function createBookRouter(controllers) {
    const router = (0, express_1.Router)();
    const { bookController } = controllers;
    //add a book DONE
    router.post("/add", middlewares_1.authenticate, async (req, res) => {
        const response = await bookController.saveBook(req.body.title, req.body.author, req.body.imageLink);
        res.json(response);
    });
    //get book by imagelink DONE
    router.get("/search/:imagelink", async (req, res) => {
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
exports.createBookRouter = createBookRouter;
