import { IsNotEmpty, IsString } from 'class-validator';

export class SingInDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
