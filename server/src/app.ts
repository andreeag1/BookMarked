import "dotenv/config";
import express, { Request, Response } from "express";
import "reflect-metadata";
import { Book } from "./entity/Book/Book";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authenticate } from "./lib/middlewares";
import { User } from "./entity/User/User";
import bcryptjs from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { AppDataSource } from "./lib/database";
import { BookRepository } from "./entity/Book";
import { UserRepository } from "./entity/User";
import { ReviewRepository } from "./entity/Review";
import { CommentRepository } from "./entity/Comment";
import { CollectionRepository } from "./entity/Collection";
import {
  createBookRouter,
  BookController,
  BookService,
  BookServiceContract,
  BookControllerContract,
} from "./modules/book";
import {
  createAuthRouter,
  AuthController,
  AuthService,
  AuthServiceContract,
  AuthControllerContract,
} from "./modules/auth";
import {
  createReviewRouter,
  ReviewController,
  ReviewService,
  ReviewControllerContract,
  ReviewServiceContract,
} from "./modules/review";
import {
  createCommentRouter,
  CommentController,
  CommentControllerContract,
  CommentService,
  CommentServiceContract,
} from "./modules/comment";
import {
  createCollectionRouter,
  CollectionController,
  CollectionControllerContract,
  CollectionService,
  CollectionServiceContract,
} from "./modules/collection";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8080",
      "http://localhost:4200",
      "https://bookmarked-client-rn4dsun2dq-uc.a.run.app",
      "https://bookmarked.andreeagugiuman.com",
    ],
    credentials: true,
  })
);

const PORT = process.env.PORT;

const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const reviewRepository = new ReviewRepository();
const commentRepository = new CommentRepository();
const collectionRepository = new CollectionRepository();

const bookService = new BookService(bookRepository);
const authService = new AuthService(userRepository, bookRepository);
const reviewService = new ReviewService(
  reviewRepository,
  userRepository,
  bookRepository
);
const commentService = new CommentService(
  commentRepository,
  userRepository,
  reviewRepository
);
const collectionService = new CollectionService(
  collectionRepository,
  bookRepository,
  userRepository
);

const bookController: BookControllerContract = new BookController(bookService);
const authController: AuthControllerContract = new AuthController(authService);
const reviewController: ReviewControllerContract = new ReviewController(
  reviewService
);
const commentController: CommentControllerContract = new CommentController(
  commentService
);
const collectionController: CollectionControllerContract =
  new CollectionController(collectionService, authService);

const controllers = {
  bookController,
  authController,
  reviewController,
  commentController,
  collectionController,
};

app.use("/book", createBookRouter(controllers));
app.use("/auth", createAuthRouter(controllers));
app.use("/review", createReviewRouter(controllers));
app.use("/comment", createCommentRouter(controllers));
app.use("/collection", createCollectionRouter(controllers));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
