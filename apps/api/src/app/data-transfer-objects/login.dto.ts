import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'testuser' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'supersecure' })
  password: string;
}
