import { DeleteResult, InsertResult } from "typeorm";
import {
  CollectionControllerContract,
  CollectionServiceContract,
  SaveCollectionResponse,
} from "./types";
import { Collection } from "../../entity/Collection";
import { AuthServiceContract } from "../auth";

export class CollectionController implements CollectionControllerContract {
  private collectionService: CollectionServiceContract;
  private authService: AuthServiceContract;

  constructor(
    collectionService: CollectionServiceContract,
    authService: AuthServiceContract
  ) {
    this.collectionService = collectionService;
    this.authService = authService;
  }

  getCollection(userId: string, title: string): Promise<Collection | null> {
    return this.collectionService.getCollection(userId, title);
  }

  saveCollection(
    title: string,
    userId: string
  ): Promise<SaveCollectionResponse> {
    this.collectionService.saveCollection(title, userId);
    return new Promise<SaveCollectionResponse>((resolve, reject) => {
      resolve({
        statusCode: 200,
        message: "success",
      });
    });
  }

  saveBookToCollection(
    collectionId: string,
    bookId: string
  ): Promise<SaveCollectionResponse> {
    this.collectionService.saveBookToCollection(collectionId, bookId);
    return new Promise<SaveCollectionResponse>((resolve, reject) => {
      resolve({
        statusCode: 200,
        message: "success",
      });
    });
  }

  getCollectionById(id: string): Promise<Collection> {
    return this.collectionService.getCollectionById(id);
  }

  deleteBookFromCollection(
    collectionId: string,
    bookId: string
  ): Promise<SaveCollectionResponse> {
    this.collectionService.deleteBookFromCollection(collectionId, bookId);
    return new Promise<SaveCollectionResponse>((resolve, reject) => {
      resolve({
        statusCode: 200,
        message: "success",
      });
    });
  }

  deleteCollection(id: string): Promise<SaveCollectionResponse> {
    this.collectionService.deleteCollection(id);
    return new Promise<SaveCollectionResponse>((resolve, reject) => {
      resolve({
        statusCode: 200,
        message: "success",
      });
    });
  }

  getCollectionByUser(id: string): Promise<Collection[]> {
    return this.collectionService.getCollectionByUser(id);
  }
}
