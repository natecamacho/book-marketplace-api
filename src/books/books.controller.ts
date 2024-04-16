import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { BuyBookDto } from './dto/buy-book.dto';
import { SellBookDto } from './dto/sell-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Query('status') status: string) {
    if (status) {
      return this.booksService.findAllByStatus(status);
    } else {
      return this.booksService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Post(':id/buy')
  buy(@Param('id') id: string, @Body() buyBookDto: BuyBookDto) {
    return this.booksService.buy(+id, buyBookDto);
  }

  @Post('sell')
  sell(@Body() sellBookDto: SellBookDto) {
    return this.booksService.sell(sellBookDto);
  }
}
