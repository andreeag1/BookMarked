import { InsertResult } from "typeorm";
import { Book } from "../../entity";
import {
  BookControllerContract,
  BookServiceContract,
  SaveBookResponse,
} from "./types";

export class BookController implements BookControllerContract {
  private bookService: BookServiceContract;

  constructor(bookService: BookServiceContract) {
    this.bookService = bookService;
  }

  getAllBooks(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  getBookByImg(img: string): Promise<Book | null> {
    return this.bookService.getBookByImg(img);
  }

  updateBook(Book: Book): Promise<Book> {
    return this.bookService.updateBook(Book);
  }

  saveBook(
    title: string,
    author: string,
    imageLink: string
  ): Promise<Book | null> {
    return this.bookService.saveBook(title, author, imageLink);
    // return new Promise<SaveBookResponse>((resolve, reject) => {
    //   resolve({
    //     statusCode: 200,
    //     message: "success",
    //   });
    // });
  }

  getBookById(id: string): Promise<Book> {
    return this.bookService.getBookById(id);
  }

  getReviewByBookId(id: string): Promise<Book | null> {
    return this.bookService.getReviewByBookId(id);
  }
}
