"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionController = void 0;
class CollectionController {
    constructor(collectionService, authService) {
        this.collectionService = collectionService;
        this.authService = authService;
    }
    getCollection(userId, title) {
        return this.collectionService.getCollection(userId, title);
    }
    saveCollection(title, userId) {
        this.collectionService.saveCollection(title, userId);
        return new Promise((resolve, reject) => {
            resolve({
                statusCode: 200,
                message: "success",
            });
        });
    }
    saveBookToCollection(collectionId, bookId) {
        this.collectionService.saveBookToCollection(collectionId, bookId);
        return new Promise((resolve, reject) => {
            resolve({
                statusCode: 200,
                message: "success",
            });
        });
    }
    getCollectionById(id) {
        return this.collectionService.getCollectionById(id);
    }
    deleteBookFromCollection(collectionId, bookId) {
        this.collectionService.deleteBookFromCollection(collectionId, bookId);
        return new Promise((resolve, reject) => {
            resolve({
                statusCode: 200,
                message: "success",
            });
        });
    }
    deleteCollection(id) {
        this.collectionService.deleteCollection(id);
        return new Promise((resolve, reject) => {
            resolve({
                statusCode: 200,
                message: "success",
            });
        });
    }
    getCollectionByUser(id) {
        return this.collectionService.getCollectionByUser(id);
    }
}
exports.CollectionController = CollectionController;
