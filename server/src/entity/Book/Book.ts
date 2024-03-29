import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Generated,
  OneToMany,
} from "typeorm";
import { Review } from "../Review/Review";
import { User } from "../User/User";

@Entity()
export class Book {
  @PrimaryColumn("varchar", { length: 36 })
  @Generated("uuid")
  id!: string;

  @Column("varchar", { length: 255 })
  title: string;

  @Column("varchar", { length: 255 })
  author: string;

  // @Column("varchar", { length: 255, default: "No description" })
  // description: string;

  @Column("varchar", { length: 255 })
  imageLink: string;

  @OneToMany(() => Review, (review) => review.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  reviews: Review[];

  @OneToMany(() => User, (user) => user.currentread, {
    onUpdate: "CASCADE",
    nullable: true,
  })
  users: User[];
}
