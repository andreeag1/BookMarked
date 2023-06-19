import { Router, Request, Response } from "express";
import { AuthControllerContract } from "./types";
import bcryptjs from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { UserRepository } from "../../entity";
import { authenticate } from "../../lib/middlewares";

export function createAuthRouter(controllers: {
  authController: AuthControllerContract;
}) {
  const router = Router();
  const { authController } = controllers;

  //register
  router.post("/register", async (req: Request, res: Response) => {
    const { firstName, lastName, email, username, password } = req.body;

    const user = await authController.saveUser(
      firstName,
      lastName,
      email,
      username,
      password
    );

    res.status(user.statusCode).json(user);
  });

  //login
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

    res.send({
      message: "success",
    });
  });

  //get a user
  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const user = await authController.getUserById(req.params.id);
      res.json(user);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  //follow a user
  router.post("/follow", async (req: Request, res: Response) => {
    if (req.body.userId !== req.body.currentUserId) {
      const userToFollow = await authController.getUserByFollower(
        req.body.userId
      );
      const currentUser = await authController.getUserById(
        req.body.currentUserId
      );
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

  //get list of people the current user follows
  router.get("/following/:id", async (req: Request, res: Response) => {
    const following = await authController.getUsersFollowing(req.params.id);
    return res.json(following);
  });

  //get a user's friend's reviews
  router.get("/reviews/:id", async (req: Request, res: Response) => {
    const following = await authController.getUsersFriendsReviews(
      req.params.id
    );
    res.json(following);
  });

  //unfollow a user
  router.put("/unfollow", async (req: Request, res: Response) => {
    if (req.body.userId !== req.body.currentUserId) {
      const userToUnfollow = await authController.getUserById(req.body.userId);
      const currentUser = await authController.getUserById(
        req.body.currentUserId
      );
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

  //logout
  router.get("/logout", async (req: Request, res: Response) => {
    res.cookie("accessToken", "", { maxAge: 0 });
    res.cookie("refreshToken", "", { maxAge: 0 });
    res.sendStatus(200);
  });

  return router;
}
