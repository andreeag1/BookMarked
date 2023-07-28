"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const Book_1 = require("./entity/Book");
const User_1 = require("./entity/User");
const Review_1 = require("./entity/Review");
const Comment_1 = require("./entity/Comment");
const Collection_1 = require("./entity/Collection");
const book_1 = require("./modules/book");
const auth_1 = require("./modules/auth");
const review_1 = require("./modules/review");
const comment_1 = require("./modules/comment");
const collection_1 = require("./modules/collection");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "http://localhost:8080",
        "http://localhost:4200",
    ],
    credentials: true,
}));
const PORT = 5000;
const bookRepository = new Book_1.BookRepository();
const userRepository = new User_1.UserRepository();
const reviewRepository = new Review_1.ReviewRepository();
const commentRepository = new Comment_1.CommentRepository();
const collectionRepository = new Collection_1.CollectionRepository();
const bookService = new book_1.BookService(bookRepository);
const authService = new auth_1.AuthService(userRepository, bookRepository);
const reviewService = new review_1.ReviewService(reviewRepository, userRepository, bookRepository);
const commentService = new comment_1.CommentService(commentRepository, userRepository, reviewRepository);
const collectionService = new collection_1.CollectionService(collectionRepository, bookRepository, userRepository);
const bookController = new book_1.BookController(bookService);
const authController = new auth_1.AuthController(authService);
const reviewController = new review_1.ReviewController(reviewService);
const commentController = new comment_1.CommentController(commentService);
const collectionController = new collection_1.CollectionController(collectionService, authService);
const controllers = {
    bookController,
    authController,
    reviewController,
    commentController,
    collectionController,
};
app.use("/book", (0, book_1.createBookRouter)(controllers));
app.use("/auth", (0, auth_1.createAuthRouter)(controllers));
app.use("/review", (0, review_1.createReviewRouter)(controllers));
app.use("/comment", (0, comment_1.createCommentRouter)(controllers));
app.use("/collection", (0, collection_1.createCollectionRouter)(controllers));
// app.post("/api/refresh", async (req: Request, res: Response) => {
//   try {
//     const refreshToken = req.cookies["refreshToken"];
//     const payload: any = verify(refreshToken, "refresh_secret");
//     if (!payload) {
//       return res.status(401).send({
//         message: "unauthenticated",
//       });
//     }
//     const accessToken = sign(
//       {
//         id: payload.id,
//       },
//       "access_secret",
//       { expiresIn: 60 * 60 }
//     );
//     res.cookie("accessToken", accessToken, {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000, //equivalent to 1 day
//     });
//     res.send({
//       message: "success",
//     });
//   } catch (e) {
//     return res.status(401).send({
//       message: "unauthenticated",
//     });
//   }
// });
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
