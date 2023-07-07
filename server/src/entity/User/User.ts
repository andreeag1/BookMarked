import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Review } from "../Review/Review";
import { Book } from "../Book/Book";
import { Comment } from "../Comment/Comment";
import { Collection } from "../Collection/Collection";

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

  @Column({ default: "" })
  picture!: string;

  @Column({ default: 0 })
  goal!: number;

  @Column({ default: 0 })
  readbooks!: number;

  @Column({ default: "" })
  title!: string;

  @Column({ default: "" })
  author!: string;

  @Column({ default: "" })
  imageLink!: string;

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
  })
  comments: Comment[];

  @ManyToOne(() => Book, (book) => book.users, {
    onUpdate: "CASCADE",
    nullable: true,
  })
  @JoinColumn()
  currentread: Book | null;

  @Column({ default: 0 })
  progress!: number;

  @OneToMany(() => Collection, (collection) => collection.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  collections: Collection[];
}
