import { InsertResult } from "typeorm";
import { Book } from "../../entity";

export interface BookControllerContract {
  getAllBooks(): Promise<Book[]>;
  saveBook(
    title: string,
    author: string,
    description: string,
    imageLink: string
  ): Promise<SaveBookResponse>;
  getBookByImg(img: string): Promise<Book | null>;
  updateBook(Book: Book): Promise<Book>;
  getBookById(id: string): Promise<Book>;
  getReviewByBookId(id: string): Promise<Book | null>;
}

export interface BookServiceContract {
  getAllBooks(): Promise<Book[]>;
  saveBook(
    title: string,
    author: string,
    description: string,
    imageLink: string
  ): Promise<Book>;
  getBookByImg(img: string): Promise<Book | null>;
  updateBook(Book: Book): Promise<Book>;
  getBookById(id: string): Promise<Book>;
  getReviewByBookId(id: string): Promise<Book | null>;
}

export type SaveBookResponse = {
  statusCode: number;
  message: string;
};
