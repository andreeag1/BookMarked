import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Review } from "../Review/Review";
import { Book } from "../Book/Book";

@Entity()
export class User {
  @PrimaryColumn("varchar", { length: 36 })
  @Generated("uuid")
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    unique: true,
  })
  username!: string;

  @Column()
  password!: string;

  @Column({ default: 0 })
  goal!: number;

  @OneToOne(() => Book, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  @JoinColumn()
  currentRead: Book;

  @ManyToMany(() => User)
  @JoinTable({
    name: "followerfollowing",
    joinColumn: {
      name: "followingId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "followerId",
      referencedColumnName: "id",
    },
  })
  followers: User[];

  @Column("boolean", { default: false })
  isAdmin: boolean;

  @OneToMany(() => Review, (review) => review.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  reviews: Review[];

  @OneToMany(() => Review, (comment) => comment.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    nullable: true,
  })
  comments: Comment[];
}
