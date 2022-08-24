import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTokenDto {
  @IsNotEmpty()
  @IsString()
  hash: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
