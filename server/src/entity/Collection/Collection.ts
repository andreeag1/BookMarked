import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Book } from "../Book/Book";

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
}
