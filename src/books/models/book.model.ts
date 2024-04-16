import { Optional } from 'sequelize';
import {
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserBook } from '../../users-books/models/user-book.model';
import { User } from '../../users/models/user.model';

export interface BookAttributes {
  id: number;
  title: string;
  author: string;
  identifier: string; // ie IBSN number
  description: string;
  price: number;
  status: string; // ie INSTOCK or SOLD
}

export interface BookCreationAttributes
  extends Optional<BookAttributes, 'id'> {}

@Table({ timestamps: false, underscored: true })
export class Book extends Model<BookAttributes, BookCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  title: string;

  @Column
  author: string;

  @Column
  identifier: string;

  @Column
  description: string;

  @Column
  price: number;

  @Column
  status: string; // TODO make enum

  @BelongsToMany(() => User, () => UserBook)
  users: User[];
}
