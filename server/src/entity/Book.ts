import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { length: 255 })
  title: string;

  @Column("varchar", { length: 255 })
  author: string;

  @Column("varchar", { length: 255 })
  description: string;

  @Column("varchar", { length: 255 })
  imageLink: string;
}
