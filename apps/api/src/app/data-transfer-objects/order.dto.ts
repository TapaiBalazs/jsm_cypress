import { PaymentType } from '@cat/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsArray()
  pizzas: number[];

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @ApiProperty({
    enum: ['CASH', 'CARD'],
    enumName: 'PaymentType',
  })
  paymentType: PaymentType;
}
