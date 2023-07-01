import { DeleteResult, InsertResult, QueryBuilder, Repository } from "typeorm";
import { Review } from "../Review/Review";
import { AppDataSource } from "../../lib/database";
import { User } from "../User";
import { Book } from "../Book";
import { Collection } from "./Collection";

export interface CollectionRepositoryContract {
  saveCollection(title: string, user: User): Promise<Collection>;
  saveBookToCollection(collection: Collection, book: Book): Promise<Collection>;
  getCollectionById(id: string): Promise<Collection>;
  deleteBookFromCollection(
    collection: Collection,
    bookToRemove: Book
  ): Promise<Collection>;
  deleteCollection(id: string): Promise<DeleteResult>;
  getCollectionByUser(id: string): Promise<Collection[]>;
}

export class CollectionRepository implements CollectionRepositoryContract {
  private repository: Repository<Collection>;

  constructor() {
    this.repository = AppDataSource.getRepository(Collection);
  }

  saveCollection(title: string, user: User): Promise<Collection> {
    const newCollection = this.repository.create({
      title: title,
    });
    newCollection.user = user;
    return this.repository.save(newCollection);
  }

  saveBookToCollection(
    collection: Collection,
    book: Book
  ): Promise<Collection> {
    collection.books = [book];
    return this.repository.save(collection);
  }

  getCollectionById(id: string): Promise<Collection> {
    return this.repository.findOneOrFail({
      relations: {
        books: true,
      },
      where: {
        id: id,
      },
    });
  }

  deleteBookFromCollection(
    collection: Collection,
    bookToRemove: Book
  ): Promise<Collection> {
    collection.books = collection.books.filter((book) => {
      return book.id !== bookToRemove.id;
    });
    return this.repository.save(collection);
  }

  deleteCollection(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id: id });
  }

  getCollectionByUser(id: string): Promise<Collection[]> {
    const queryBuilder = this.repository
      .createQueryBuilder("collection")
      .leftJoinAndSelect("collection.books", "book")
      .where("collection.userId = :idOne", { idOne: id })
      .getMany();

    return queryBuilder;
  }
}
