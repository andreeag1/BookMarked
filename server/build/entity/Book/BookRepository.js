"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepository = void 0;
const Book_1 = require("./Book");
const database_1 = require("../../lib/database");
class BookRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(Book_1.Book);
    }
    getAllBooks() {
        return this.repository.find();
    }
    getBookByImg(img) {
        return this.repository.findOne({
            where: {
                imageLink: img,
            },
        });
    }
    getBookById(id) {
        return this.repository.findOneOrFail({
            where: {
                id: id,
            },
        });
    }
    updateBook(Book) {
        return this.repository.save(Book);
    }
    async saveBook(title, author, imageLink) {
        const existingBook = await this.repository.findOne({
            where: {
                title: title,
                author: author,
                imageLink: imageLink,
            },
        });
        if (existingBook == null) {
            const book = this.repository.create({
                title: title,
                author: author,
                imageLink: imageLink,
            });
            this.repository.save(book);
            return this.repository.findOne({
                where: {
                    title: title,
                    author: author,
                    imageLink: imageLink,
                },
            });
        }
        return existingBook;
    }
    getReviewByBookId(id) {
        return this.repository.findOne({
            relations: ["reviews"],
            where: {
                id: id,
            },
        });
    }
}
exports.BookRepository = BookRepository;
