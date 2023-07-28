"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionService = void 0;
class CollectionService {
    constructor(collectionRepository, bookRepository, userRepository) {
        this.collectionRepository = collectionRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }
    async saveCollection(title, userId) {
        const user = await this.userRepository.getUserById(userId);
        return this.collectionRepository.saveCollection(title, user);
    }
    async saveBookToCollection(collectionId, bookId) {
        const book = await this.bookRepository.getBookById(bookId);
        const collection = await this.collectionRepository.getCollectionById(collectionId);
        return this.collectionRepository.saveBookToCollection(collection, book);
    }
    getCollectionById(id) {
        return this.collectionRepository.getCollectionById(id);
    }
    async deleteBookFromCollection(collectionId, bookId) {
        const book = await this.bookRepository.getBookById(bookId);
        const collection = await this.collectionRepository.getCollectionById(collectionId);
        return this.collectionRepository.deleteBookFromCollection(collection, book);
    }
    deleteCollection(id) {
        return this.collectionRepository.deleteCollection(id);
    }
    getCollectionByUser(id) {
        return this.collectionRepository.getCollectionByUser(id);
    }
    getCollection(userId, title) {
        return this.collectionRepository.getCollection(userId, title);
    }
}
exports.CollectionService = CollectionService;
