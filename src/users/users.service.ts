import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Book } from '../books/models/book.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async findOne(id: number) {
    return await this.userModel.findByPk(id);
  }

  getAllListings(id: number) {
    return this.userModel.findByPk(id, {
      include: [
        {
          model: Book,
          through: { attributes: [], where: { status: 'SELLING' } },
        },
      ],
    });
  }

  getAllSales(id: number) {
    return this.userModel.findByPk(id, {
      include: [
        {
          model: Book,
          through: { attributes: [], where: { status: 'SOLD' } },
        },
      ],
    });
  }

  getAllPurchases(id: number) {
    return this.userModel.findByPk(id, {
      include: [
        {
          model: Book,
          through: { attributes: [], where: { status: 'PURCHASED' } },
        },
      ],
    });
  }
}
