import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { BooksModule } from '../src/books/books.module';
import { BooksService } from '../src/books/books.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Book } from '../src/books/models/book.model';
import { UserBook } from '../src/users-books/models/user-book.model';

describe('Books', () => {
  let app: INestApplication;
  const booksService = {
    buy: () => Promise.resolve(),
    sell: () => Promise.resolve(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BooksModule],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .overrideProvider(getModelToken(Book))
      .useValue({})
      .overrideProvider(getModelToken(UserBook))
      .useValue({})
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it(`POST /books/:id/buy`, () => {
    return request(app.getHttpServer())
      .post('/books/1/buy')
      .send({ buyerId: 1, purchasePrice: 14 })
      .expect(201);
  });

  it(`POST /books/:id/buy bad id`, () => {
    return request(app.getHttpServer())
      .post('/books/abc/buy')
      .send({ buyerId: 1, purchasePrice: 14 })
      .expect(400);
  });

  it(`POST /books/sell`, () => {
    return request(app.getHttpServer())
      .post('/books/sell')
      .send({
        title: 'Book 1',
        author: 'Author 1',
        description: 'Description 1',
        identifier: 'identifier 1',
        price: 14,
        userId: 1,
      })
      .expect(201);
  });

  it(`POST /books/sell bad payload`, () => {
    return request(app.getHttpServer())
      .post('/books/sell')
      .send({
        author: 'Author 1',
        description: 'Description 1',
        identifier: 'identifier 1',
        price: 14,
        userId: 1,
      }) // missing title
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
