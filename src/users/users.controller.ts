import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.findOne(+id);
  }

  @Get(':id/purchases')
  getAllPurchases(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.getAllPurchases(+id);
  }

  @Get(':id/sales')
  getAllSales(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.getAllSales(+id);
  }

  @Get(':id/listings')
  getAllListings(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.getAllListings(+id);
  }
}
