import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './models/book.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersBooksModule } from '../users-books/users-books.module';

@Module({
  imports: [SequelizeModule.forFeature([Book]), UsersBooksModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
