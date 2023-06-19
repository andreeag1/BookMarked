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
    description: string,
    imageLink: string
  ): Promise<Book>;
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

  saveBook(
    title: string,
    author: string,
    description: string,
    imageLink: string
  ): Promise<Book> {
    const book = this.repository.create({
      title: title,
      author: author,
      description: description,
      imageLink: imageLink,
    });
    return this.repository.save(book);
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
