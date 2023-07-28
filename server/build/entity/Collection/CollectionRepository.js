"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionRepository = void 0;
const database_1 = require("../../lib/database");
const Collection_1 = require("./Collection");
class CollectionRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(Collection_1.Collection);
    }
    getCollection(id, title) {
        const queryBuilder = this.repository
            .createQueryBuilder("collection")
            .where("collection.userId = :idOne", { idOne: id })
            .andWhere("collection.title = :idTwo", { idTwo: title })
            .getOne();
        return queryBuilder;
    }
    saveCollection(title, user) {
        const newCollection = this.repository.create({
            title: title,
        });
        newCollection.user = user;
        return this.repository.save(newCollection);
    }
    saveBookToCollection(collection, book) {
        collection.books.push(book);
        return this.repository.save(collection);
    }
    getCollectionById(id) {
        return this.repository.findOneOrFail({
            relations: {
                books: true,
            },
            where: {
                id: id,
            },
        });
    }
    deleteBookFromCollection(collection, bookToRemove) {
        collection.books = collection.books.filter((book) => {
            return book.id !== bookToRemove.id;
        });
        return this.repository.save(collection);
    }
    deleteCollection(id) {
        return this.repository.delete({ id: id });
    }
    getCollectionByUser(id) {
        const queryBuilder = this.repository
            .createQueryBuilder("collection")
            .leftJoinAndSelect("collection.books", "book")
            .where("collection.userId = :idOne", { idOne: id })
            .getMany();
        return queryBuilder;
    }
}
exports.CollectionRepository = CollectionRepository;
