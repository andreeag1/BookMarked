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
    ],
    credentials: true,
  })
);

const PORT = 5000;

const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const reviewRepository = new ReviewRepository();
const commentRepository = new CommentRepository();
const collectionRepository = new CollectionRepository();

const bookService = new BookService(bookRepository);
const authService = new AuthService(userRepository);
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
  new CollectionController(collectionService);

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
