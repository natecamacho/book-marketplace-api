import { Optional } from 'sequelize';
import {
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Book } from '../../books/models/book.model';
import { UserBook } from '../../users-books/models/user-book.model';

export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

@Table({ timestamps: false, underscored: true })
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  emailAddress: string;

  @BelongsToMany(() => Book, () => UserBook)
  books: Book[];
}
