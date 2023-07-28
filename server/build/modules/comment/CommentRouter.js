"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../../lib/middlewares");
function createCommentRouter(controllers) {
    const router = (0, express_1.Router)();
    const { commentController } = controllers;
    //add a comment DONE
    router.post("/add", middlewares_1.authenticate, async (req, res) => {
        const comment = await commentController.saveComment(req.body.comment, req.body.user, req.body.review);
        res.status(comment.statusCode).json(comment);
    });
    //delete a comment DONE
    router.put("/delete", middlewares_1.authenticate, async (req, res) => {
        const comment = await commentController.deleteComment(req.body.commentId);
        res.status(comment.statusCode).json(comment);
    });
    //get count of comments DONE
    router.get("/count/:id", async (req, res) => {
        const count = await commentController.getCount(req.params.id);
        res.json(count);
    });
    //get a reviews comments DONE
    router.get("/review/:id", async (req, res) => {
        const comments = await commentController.getCommentByReview(req.params.id);
        res.json(comments);
    });
    return router;
}
exports.createCommentRouter = createCommentRouter;
