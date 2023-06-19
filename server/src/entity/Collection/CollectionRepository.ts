import { DeleteResult, InsertResult, QueryBuilder, Repository } from "typeorm";
import { Review } from "../Review/Review";
import { AppDataSource } from "../../lib/database";
import { User } from "../User";
import { Book } from "../Book";
import { Collection } from "./Collection";

export interface CollectionRepositoryContract {
  saveCollection(title: string): Promise<Collection>;
  saveBookToCollection(collection: Collection, book: Book): Promise<Collection>;
  getCollectionById(id: string): Promise<Collection>;
  deleteBookFromCollection(
    collection: Collection,
    bookToRemove: Book
  ): Promise<Collection>;
  deleteCollection(id: string): Promise<DeleteResult>;
}

export class CollectionRepository implements CollectionRepositoryContract {
  private repository: Repository<Collection>;

  constructor() {
    this.repository = AppDataSource.getRepository(Collection);
  }

  saveCollection(title: string): Promise<Collection> {
    const newCollection = this.repository.create({
      title: title,
    });
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
}