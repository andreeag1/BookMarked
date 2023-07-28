import { Router, Request, Response } from "express";
import { AuthControllerContract, TokenContent } from "./types";
import bcryptjs from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { UserRepository } from "../../entity";
import { authenticate } from "../../lib/middlewares";
import jwt_decode from "jwt-decode";
import { BookController, BookControllerContract } from "../book";
import jwtDecode from "jwt-decode";
import { CollectionControllerContract } from "../collection";

export function createAuthRouter(controllers: {
  authController: AuthControllerContract;
  collectionController: CollectionControllerContract;
}) {
  const router = Router();
  const { authController, collectionController } = controllers;

  //register DONE
  router.post("/register", async (req: Request, res: Response) => {
    const { firstName, lastName, email, username, password } = req.body;
    const user = await authController.saveUser(
      firstName,
      lastName,
      email,
      username,
      password
    );
    console.log(user);
    res.json(user);
  });

  //login DONE
  router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await authController.getUserByEmail(email);

    if (!user) {
      return res.status(400).send({
        message: "Invalid Credentials",
      });
    }

    if (!(await bcryptjs.compare(password, user.password))) {
      return res.status(400).send({
        message: "Invalid Crendentials",
      });
    }

    const accessToken = sign(
      {
        id: user.id,
      },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: 60 * 60 }
    );

    const refreshToken = sign(
      {
        id: user.id,
      },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: 24 * 60 * 60 }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //equivalent to 1 day
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //equivalent to 7 days
    });

    user.isAdmin = true;
    await authController.updateUser(user);

    return res.status(200).send({
      message: "success",
    });
  });

  //get user id from jwt token DONE
  router.get("/me", authenticate, async (req: Request, res: Response) => {
    const accessToken = req.cookies["accessToken"];
    const decoded = jwtDecode<TokenContent>(accessToken);
    const user = decoded.id;
    res.status(200).json(user);
  });

  //logout DONE
  router.get("/logout", authenticate, async (req: Request, res: Response) => {
    res.cookie("accessToken", "", { maxAge: 0 });
    res.cookie("refreshToken", "", { maxAge: 0 });
    res.sendStatus(200);
  });

  router.get("/all", authenticate, async (req: Request, res: Response) => {
    const user = await authController.getAllUsers();
    res.json(user);
  });

  //get current user by id DONE
  router.get("/user", authenticate, async (req: Request, res: Response) => {
    const accessToken = req.cookies["accessToken"];
    const decoded = jwtDecode<TokenContent>(accessToken);
    const user = decoded.id;
    const newUser = await authController.getUserById(user);
    res.json(newUser);
  });

  //get any user by id DONE
  router.get("/user/:id", authenticate, async (req: Request, res: Response) => {
    const newUser = await authController.getUserById(req.params.id);
    res.json(newUser);
  });

  //get any user by email DONE
  router.get("/user-email/:email", async (req: Request, res: Response) => {
    const newUser = await authController.getUserByEmail(req.params.email);
    console.log(newUser);
    res.json(newUser);
  });

  //follow a user DONE
  router.post("/follow", authenticate, async (req: Request, res: Response) => {
    const accessToken = req.cookies["accessToken"];
    const decoded = jwtDecode<TokenContent>(accessToken);
    const currentUserId = decoded.id;
    if (req.body.userId !== currentUserId) {
      const userToFollow = await authController.getUserByFollower(
        req.body.userId
      );
      const currentUser = await authController.getUserById(currentUserId);
      if (userToFollow && currentUser) {
        userToFollow.followers.push(currentUser);
        await authController.updateUser(userToFollow);
        res.sendStatus(200);
      }
    } else {
      res.status(403).json({
        message: "Cannot follow yourself",
      });
    }
  });

  //get list of people the current user follows DONE
  router.get(
    "/following",
    authenticate,
    async (req: Request, res: Response) => {
      const accessToken = req.cookies["accessToken"];
      const decoded = jwtDecode<TokenContent>(accessToken);
      const currentUserId = decoded.id;
      const following = await authController.getUsersFollowing(currentUserId);
      return res.json(following);
    }
  );

  //get list of people a user follows DONE
  router.get(
    "/following/:id",
    authenticate,
    async (req: Request, res: Response) => {
      const following = await authController.getUsersFollowing(req.params.id);
      return res.json(following);
    }
  );

  //get a user's friend's reviews DONE
  router.get("/reviews", authenticate, async (req: Request, res: Response) => {
    const accessToken = req.cookies["accessToken"];
    const decoded = jwtDecode<TokenContent>(accessToken);
    const currentUserId = decoded.id;
    const following = await authController.getUsersFriendsReviews(
      currentUserId
    );
    res.json(following);
  });

  //unfollow a user DONE
  router.put("/unfollow", authenticate, async (req: Request, res: Response) => {
    const accessToken = req.cookies["accessToken"];
    const decoded = jwtDecode<TokenContent>(accessToken);
    const currentUserId = decoded.id;
    if (req.body.userId !== currentUserId) {
      const userToUnfollow = await authController.getUserById(req.body.userId);
      const currentUser = await authController.getUserById(currentUserId);
      const unfollow = await authController.unfollowUser(
        userToUnfollow,
        currentUser
      );
      res.status(unfollow.statusCode).json(unfollow);
    } else {
      res.status(403).json({
        message: "Cannot unfollow yourself",
      });
    }
  });

  //add a yearly goal DONE
  router.post("/goal", authenticate, async (req: Request, res: Response) => {
    const accessToken = req.cookies["accessToken"];
    const decoded = jwtDecode<TokenContent>(accessToken);
    const currentUserId = decoded.id;
    const user = await authController.getUserById(currentUserId);
    const goal = await authController.addGoal(user, req.body.goal);
    res.status(goal.statusCode).json(goal);
  });

  router.post(
    "/profilepic",
    authenticate,
    async (req: Request, res: Response) => {
      const accessToken = req.cookies["accessToken"];
      const decoded = jwtDecode<TokenContent>(accessToken);
      const currentUserId = decoded.id;
      const user = await authController.getUserById(currentUserId);
      const update = await authController.addProfilePic(user, req.body.picture);
      res.status(update.statusCode).json(update);
    }
  );

  //add a current read DONE
  router.post(
    "/currentread",
    authenticate,
    async (req: Request, res: Response) => {
      const accessToken = req.cookies["accessToken"];
      const decoded = jwtDecode<TokenContent>(accessToken);
      const currentUserId = decoded.id;
      const user = await authController.getUserById(currentUserId);
      user.title = req.body.title;
      user.author = req.body.author;
      user.imageLink = req.body.imageLink;
      const newUser = await authController.updateUser(user);
      res.json(newUser);
    }
  );

  //remove current read DONE
  router.put(
    "/removecurrent",
    authenticate,
    async (req: Request, res: Response) => {
      const accessToken = req.cookies["accessToken"];
      const decoded = jwtDecode<TokenContent>(accessToken);
      const currentUserId = decoded.id;
      const user = await authController.getUserById(currentUserId);
      user.title = "";
      user.author = "";
      user.imageLink = "";
      const newUser = await authController.updateUser(user);
      res.json(newUser);
    }
  );

  //get current read DONE
  router.get(
    "/getcurrent",
    authenticate,
    async (req: Request, res: Response) => {
      const accessToken = req.cookies["accessToken"];
      const decoded = jwtDecode<TokenContent>(accessToken);
      const currentUserId = decoded.id;
      const user = await authController.getUserById(currentUserId);
      if (user.title == "") {
        return null;
      }
      return res.json(user);
    }
  );

  //add progress to yearly goal DONE
  router.post(
    "/readbooks",
    authenticate,
    async (req: Request, res: Response) => {
      const accessToken = req.cookies["accessToken"];
      const decoded = jwtDecode<TokenContent>(accessToken);
      const currentUserId = decoded.id;
      const user = await authController.getUserById(currentUserId);
      const progress = await authController.updateReadBooksCount(
        user,
        req.body.progress
      );
      res.status(progress.statusCode).json(progress);
    }
  );

  //add progress on current read  DONE
  router.post(
    "/progress",
    authenticate,
    async (req: Request, res: Response) => {
      const accessToken = req.cookies["accessToken"];
      const decoded = jwtDecode<TokenContent>(accessToken);
      const currentUserId = decoded.id;
      const user = await authController.getUserById(currentUserId);
      if (req.body.progress <= 100) {
        const progress = await authController.updateProgress(
          user,
          req.body.progress
        );
        res.status(progress.statusCode).json(progress);
      } else {
        return res.status(403).send({
          message: "Progress percentage must be 100 or less",
        });
      }
    }
  );

  return router;
}
