"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
class BookService {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    getAllBooks() {
        return this.bookRepository.getAllBooks();
    }
    getBookByImg(img) {
        return this.bookRepository.getBookByImg(img);
    }
    updateBook(Book) {
        return this.bookRepository.updateBook(Book);
    }
    saveBook(title, author, imageLink) {
        return this.bookRepository.saveBook(title, author, imageLink);
    }
    getBookById(id) {
        return this.bookRepository.getBookById(id);
    }
    getReviewByBookId(id) {
        return this.bookRepository.getReviewByBookId(id);
    }
}
exports.BookService = BookService;
