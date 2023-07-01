import { InsertResult, Repository } from "typeorm";
import { Book } from "./Book";
import { AppDataSource } from "../../lib/database";

export interface BookRepositoryContract {
  getAllBooks(): Promise<Book[]>;
  getBookByImg(img: string): Promise<Book | null>;
  updateBook(Book: Book): Promise<Book>;
  saveBook(
    title: string,
    author: string,
    imageLink: string
  ): Promise<Book | null>;
  getBookById(id: string): Promise<Book>;
  getReviewByBookId(id: string): Promise<Book | null>;
}

export class BookRepository implements BookRepositoryContract {
  private repository: Repository<Book>;

  constructor() {
    this.repository = AppDataSource.getRepository(Book);
  }

  getAllBooks(): Promise<Book[]> {
    return this.repository.find();
  }

  getBookByImg(img: string): Promise<Book | null> {
    return this.repository.findOne({
      where: {
        imageLink: img,
      },
    });
  }

  getBookById(id: string): Promise<Book> {
    return this.repository.findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  updateBook(Book: Book): Promise<Book> {
    return this.repository.save(Book);
  }

  async saveBook(
    title: string,
    author: string,
    imageLink: string
  ): Promise<Book | null> {
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

  getReviewByBookId(id: string): Promise<Book | null> {
    return this.repository.findOne({
      relations: ["reviews"],
      where: {
        id: id,
      },
    });
  }
}
