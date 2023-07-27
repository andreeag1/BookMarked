import { DataSource } from "typeorm";
import { Book, User, Review } from "../entity";
import { Comment } from "../entity/Comment";
import { Collection } from "../entity/Collection";

export let AppDataSource: DataSource;

if (process.env.ENV !== "prod") {
  AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Book, User, Review, Comment, Collection],
    synchronize: true,
  });
} else {
  AppDataSource = new DataSource({
    type: "mysql",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    extra: {
      socketPath: process.env.DB_SOCKET_PATH,
    },
    entities: [Book, User, Review, Comment, Collection],
    synchronize: true,
  });
}

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
