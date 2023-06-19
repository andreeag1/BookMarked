import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { User } from "../User/User";
import { Book } from "../Book/Book";

@Entity()
export class Review {
  @PrimaryColumn("varchar", { length: 36 })
  @Generated("uuid")
  id!: string;

  @Column("varchar", { length: 500 })
  review!: string;

  @ManyToOne(() => User, (user: User) => user.reviews)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => Book, (book: Book) => book.reviews)
  @JoinColumn({ name: "bookId" })
  book: Book;

  @OneToMany(() => Review, (comment) => comment.review, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    nullable: true,
  })
  comments: Comment[];
}
