import { Injectable } from '@nestjs/common';
import { SellBookDto } from './dto/sell-book.dto';
import { BuyBookDto } from './dto/buy-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './models/book.model';
import { UserBook } from '../users-books/models/user-book.model';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
    @InjectModel(UserBook)
    private userBookModel: typeof UserBook,
  ) {}

  async sell(sellBookDto: SellBookDto) {
    const { userId, ...sellBookDtoWithoutUserId } = sellBookDto;
    const newBook = await this.bookModel.create({
      ...sellBookDtoWithoutUserId,
      status: 'INSTOCK',
    });

    await this.userBookModel.create({
      userId,
      bookId: newBook.id,
      status: 'SELLING',
    });

    return;
  }

  async buy(id: number, buyBookDto: BuyBookDto) {
    const book = await this.bookModel.findByPk(id);
    book.status = 'SOLD';
    await book.save();

    await this.userBookModel.create({
      userId: buyBookDto.buyerId,
      bookId: id,
      status: 'PURCHASED',
    });

    const existingListing = await this.userBookModel.findOne({
      where: {
        bookId: id,
        status: 'SELLING',
      },
    });

    if (existingListing) {
      existingListing.status = 'SOLD';
      await existingListing.save();
    }
  }

  findAll() {
    return this.bookModel.findAll();
  }

  findAllByStatus(status: string) {
    return this.bookModel.findAll({ where: { status } });
  }

  findOne(id: number) {
    return this.bookModel.findByPk(id);
  }
}
