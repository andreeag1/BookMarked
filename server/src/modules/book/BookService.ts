import { InsertResult } from "typeorm";
import { Book, BookRepositoryContract } from "../../entity";
import { BookServiceContract } from "./types";

export class BookService implements BookServiceContract {
  private bookRepository: BookRepositoryContract;

  constructor(bookRepository: BookRepositoryContract) {
    this.bookRepository = bookRepository;
  }

  getAllBooks(): Promise<Book[]> {
    return this.bookRepository.getAllBooks();
  }

  getBookByImg(img: string): Promise<Book | null> {
    return this.bookRepository.getBookByImg(img);
  }

  updateBook(Book: Book): Promise<Book> {
    return this.bookRepository.updateBook(Book);
  }

  saveBook(
    title: string,
    author: string,
    description: string,
    imageLink: string
  ): Promise<Book> {
    return this.bookRepository.saveBook(title, author, description, imageLink);
  }

  getBookById(id: string): Promise<Book> {
    return this.bookRepository.getBookById(id);
  }

  getReviewByBookId(id: string): Promise<Book | null> {
    return this.bookRepository.getReviewByBookId(id);
  }
}
