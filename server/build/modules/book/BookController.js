"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    getAllBooks() {
        return this.bookService.getAllBooks();
    }
    getBookByImg(img) {
        return this.bookService.getBookByImg(img);
    }
    updateBook(Book) {
        return this.bookService.updateBook(Book);
    }
    saveBook(title, author, imageLink) {
        return this.bookService.saveBook(title, author, imageLink);
        // return new Promise<SaveBookResponse>((resolve, reject) => {
        //   resolve({
        //     statusCode: 200,
        //     message: "success",
        //   });
        // });
    }
    getBookById(id) {
        return this.bookService.getBookById(id);
    }
    getReviewByBookId(id) {
        return this.bookService.getReviewByBookId(id);
    }
}
exports.BookController = BookController;
