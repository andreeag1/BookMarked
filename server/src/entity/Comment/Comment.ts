import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "../User/User";
import { Review } from "../Review/Review";

@Entity()
export class Comment {
  @PrimaryColumn("varchar", { length: 36 })
  @Generated("uuid")
  id!: string;

  @Column("varchar", { length: 500 })
  comment!: string;

  @ManyToOne(() => User, (user: User) => user.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Review, (review: Review) => review.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "reviewId" })
  review: Review;
}
