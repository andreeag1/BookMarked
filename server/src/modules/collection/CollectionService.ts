import { DeleteResult, InsertResult } from "typeorm";
import { CollectionServiceContract } from "./types";
import { CollectionRepositoryContract } from "../../entity/Collection";
import { Collection } from "../../entity/Collection";
import { BookRepositoryContract } from "../../entity";

export class CollectionService implements CollectionServiceContract {
  private collectionRepository: CollectionRepositoryContract;
  private bookRepository: BookRepositoryContract;

  constructor(
    collectionRepository: CollectionRepositoryContract,
    bookRepository: BookRepositoryContract
  ) {
    this.collectionRepository = collectionRepository;
    this.bookRepository = bookRepository;
  }

  saveCollection(title: string): Promise<Collection> {
    return this.collectionRepository.saveCollection(title);
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
}
