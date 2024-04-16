import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserBook } from './models/user-book.model';

@Module({
  imports: [SequelizeModule.forFeature([UserBook])],
  exports: [SequelizeModule],
})
export class UsersBooksModule {}
