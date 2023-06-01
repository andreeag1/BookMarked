import "dotenv/config";
import express, { Request, Response } from "express";
import "reflect-metadata";
import { DataSource, Repository } from "typeorm";
import { Book } from "./Book";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authenticate } from "./lib/middlewares";
import { User } from "./entity/User";
import bcryptjs from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

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

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Book, User],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const bookRepository = AppDataSource.getRepository(Book);
const userRepository = AppDataSource.getRepository(User);

app.post("/api/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await userRepository.save({
    name,
    email,
    password: await bcryptjs.hash(password, 12),
  });

  res.sendStatus(200);
});

app.post("/api/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  });

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

app.get("/api/user", async (req: Request, res: Response) => {
  const accessToken = req.cookies["accessToken"];

  const payload: any = verify(accessToken, "access_secret");

  if (!payload) {
    return res.status(401).send({
      message: "Unauthenticated",
    });
  }

  const user = await userRepository.findOne({
    where: {
      id: payload.id,
    },
  });

  if (!user) {
    return res.status(401).send({
      message: "Unauthenticated",
    });
  }

  const { password, ...data } = user;

  res.send(data);
});

app.post("/api/refresh", async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies["refreshToken"];

    const payload: any = verify(refreshToken, "refresh_secret");

    if (!payload) {
      return res.status(401).send({
        message: "unauthenticated",
      });
    }

    const accessToken = sign(
      {
        id: payload.id,
      },
      "access_secret",
      { expiresIn: 60 * 60 }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //equivalent to 1 day
    });

    res.send({
      message: "success",
    });
  } catch (e) {
    return res.status(401).send({
      message: "unauthenticated",
    });
  }
});

app.get("/api/logout", async (req: Request, res: Response) => {
  res.cookie("accessToken", "", { maxAge: 0 });
  res.cookie("refreshToken", "", { maxAge: 0 });
});

app.get("/book", authenticate, async (req: Request, res: Response) => {
  const book = await bookRepository.find();
  res.json(book);
});

app.post("/book/add", async (req: Request, res: Response) => {
  const book = bookRepository.create({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    imageLink: req.body.imageLink,
  });
  await bookRepository.insert(book);
  res.sendStatus(200);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Reezan is the cutest boy ever <3");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
