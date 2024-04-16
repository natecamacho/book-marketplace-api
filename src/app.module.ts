import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { User } from './users/models/user.model';
import { Book } from './books/models/book.model';
import { UsersBooksModule } from './users-books/users-books.module';
import { UserBook } from './users-books/models/user-book.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: 'ZFwVACYSD6bK5f',
      database: 'book_marketplace',
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    BooksModule,
    UsersBooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
