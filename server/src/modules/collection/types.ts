import { DeleteResult, InsertResult } from "typeorm";
import { Collection } from "../../entity/Collection";

export interface CollectionControllerContract {
  saveCollection(title: string): Promise<SaveCollectionResponse>;
  saveBookToCollection(
    collectionId: string,
    bookId: string
  ): Promise<SaveCollectionResponse>;
  getCollectionById(id: string): Promise<Collection>;
  deleteBookFromCollection(
    collectionId: string,
    bookId: string
  ): Promise<SaveCollectionResponse>;
  deleteCollection(id: string): Promise<SaveCollectionResponse>;
}

export interface CollectionServiceContract {
  saveCollection(title: string): Promise<Collection>;
  saveBookToCollection(
    collectionId: string,
    bookId: string
  ): Promise<Collection>;
  getCollectionById(id: string): Promise<Collection>;
  deleteBookFromCollection(
    collectionId: string,
    bookId: string
  ): Promise<Collection>;
  deleteCollection(id: string): Promise<DeleteResult>;
}

export type SaveCollectionResponse = {
  statusCode: number;
  message: string;
};
