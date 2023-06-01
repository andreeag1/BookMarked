import express, { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies["accessToken"];
  //   const accessToken = "";
  //   console.log(req.cookies);

  if (accessToken) {
    verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string,
      (err: any, user: any) => {
        if (err) {
          console.log("middlewares.authenticate: invalid access token");
          return res.sendStatus(403);
        }
        res.locals.user = user;
        next();
      }
    );
  } else {
    console.log(
      "middlewares.authenticate: unauthorized, access token does not exist"
    );
    res.sendStatus(401);
  }
};
