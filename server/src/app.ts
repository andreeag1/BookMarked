import express, { Request, Response } from "express";
import "reflect-metadata";
import { DataSource, Repository } from "typeorm";
import { Book } from "./Book";

const app = express();
app.use(express.json());

const PORT = 5000;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "purplebunny",
  database: "bookmarked",
  entities: [Book],
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

app.get("/book", async (req: Request, res: Response) => {
  const book = await bookRepository.find();
  res.json(book);
});

app.post("/book/add", async (req: Request, res: Response) => {
  // const response = {
  //   title: req.body.title,
  //   author: req.body.author,
  //   description: req.body.description,
  //   imageLink: req.body.imageLink,
  // };
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
