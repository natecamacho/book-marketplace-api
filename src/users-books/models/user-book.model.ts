import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Book } from '../../books/models/book.model';
import { User } from '../../users/models/user.model';

@Table({
  tableName: 'users_books_status',
  underscored: true,
  timestamps: false,
})
export class UserBook extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Book)
  @Column
  bookId: number;

  @Column
  status: string;
}
