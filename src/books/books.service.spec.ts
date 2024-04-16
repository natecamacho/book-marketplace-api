import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/sequelize';
import { Book } from './models/book.model';
import { UserBook } from '../users-books/models/user-book.model';
import { SellBookDto } from './dto/sell-book.dto';
import { BuyBookDto } from './dto/buy-book.dto';

describe('BooksService', () => {
  let service: BooksService;

  const mockBookModel = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
  };

  const mockUserBookModel = {
    create: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(UserBook),
          useValue: mockUserBookModel,
        },
        {
          provide: getModelToken(Book),
          useValue: mockBookModel,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  describe('sell', () => {
    it('should create a book for sale', async () => {
      const book = {
        id: 1,
        title: 'Book 1',
        author: 'Author 1',
        description: 'Description 1',
        identifier: 'test',
        price: 10,
        status: 'INSTOCK',
      };
      mockBookModel.create.mockResolvedValue(book);

      const input: SellBookDto = {
        title: 'Book 1',
        author: 'Author 1',
        description: 'Description 1',
        identifier: 'test',
        price: 10,
        userId: 1,
      };

      await service.sell(input);

      const { userId, ...remainingInput } = input;

      expect(mockBookModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...remainingInput,
          status: 'INSTOCK',
        }),
      );

      expect(mockUserBookModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId,
          bookId: book.id,
          status: 'SELLING',
        }),
      );
    });
  });

  describe('buy', () => {
    it('should buy book successfully', async () => {
      const mockBook = { id: 1, save: jest.fn() };
      mockBookModel.findByPk.mockResolvedValue(mockBook);

      const mockUserBook = { save: jest.fn() };
      mockUserBookModel.findOne.mockResolvedValue(mockUserBook);

      const input: BuyBookDto = {
        buyerId: 2,
        purchasePrice: 10,
      };

      await service.buy(1, input);

      expect(mockBook.save).toHaveBeenCalled();
      expect(mockUserBookModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: input.buyerId,
          bookId: mockBook.id,
          status: 'PURCHASED',
        }),
      );
      expect(mockUserBookModel.findOne).toHaveBeenCalled();
      expect(mockUserBook.save).toHaveBeenCalled();
    });
  });
});
