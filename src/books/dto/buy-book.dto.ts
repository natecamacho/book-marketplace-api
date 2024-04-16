import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class BuyBookDto {
  @IsNotEmpty()
  @IsInt()
  buyerId: number;

  @IsNotEmpty()
  @IsNumber()
  purchasePrice: number;

  // payment info

  // delivery info
}
