import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Book } from "../Book/Book";
import { User } from "../User/User";

@Entity()
export class Collection {
  @PrimaryColumn("varchar", { length: 36 })
  @Generated("uuid")
  id!: string;

  @Column("varchar", { length: 500 })
  title!: string;

  @ManyToMany(() => Book, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinTable()
  books: Book[];

  @ManyToOne(() => User, (user) => user.collections, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;
}
