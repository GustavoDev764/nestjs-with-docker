import { IsNotEmpty } from 'class-validator';
import { IsUniqueUser } from '@App/users/validator/uniqueuser.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsUniqueUser()
  user: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
