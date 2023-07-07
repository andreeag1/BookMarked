import { DeleteResult, InsertResult } from "typeorm";
import { CollectionServiceContract } from "./types";
import { CollectionRepositoryContract } from "../../entity/Collection";
import { Collection } from "../../entity/Collection";
import { BookRepositoryContract, UserRepositoryContract } from "../../entity";

export class CollectionService implements CollectionServiceContract {
  private collectionRepository: CollectionRepositoryContract;
  private bookRepository: BookRepositoryContract;
  private userRepository: UserRepositoryContract;

  constructor(
    collectionRepository: CollectionRepositoryContract,
    bookRepository: BookRepositoryContract,
    userRepository: UserRepositoryContract
  ) {
    this.collectionRepository = collectionRepository;
    this.bookRepository = bookRepository;
    this.userRepository = userRepository;
  }

  async saveCollection(title: string, userId: string): Promise<Collection> {
    const user = await this.userRepository.getUserById(userId);
    return this.collectionRepository.saveCollection(title, user);
  }

  async saveBookToCollection(
    collectionId: string,
    bookId: string
  ): Promise<Collection> {
    const book = await this.bookRepository.getBookById(bookId);
    const collection = await this.collectionRepository.getCollectionById(
      collectionId
    );
    return this.collectionRepository.saveBookToCollection(collection, book);
  }

  getCollectionById(id: string): Promise<Collection> {
    return this.collectionRepository.getCollectionById(id);
  }

  async deleteBookFromCollection(
    collectionId: string,
    bookId: string
  ): Promise<Collection> {
    const book = await this.bookRepository.getBookById(bookId);
    const collection = await this.collectionRepository.getCollectionById(
      collectionId
    );
    return this.collectionRepository.deleteBookFromCollection(collection, book);
  }

  deleteCollection(id: string): Promise<DeleteResult> {
    return this.collectionRepository.deleteCollection(id);
  }

  getCollectionByUser(id: string): Promise<Collection[]> {
    return this.collectionRepository.getCollectionByUser(id);
  }

  getCollection(userId: string, title: string): Promise<Collection | null> {
    return this.collectionRepository.getCollection(userId, title);
  }
}
