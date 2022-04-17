import { Repository, EntityRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { UserEntity } from '@App/users/entities/user.entity';

import { hash, genSalt } from 'bcryptjs';

@EntityRepository(UserEntity)
export class AuthRepository extends Repository<UserEntity> {
  async cryptPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  async comparePassword(password: string, passwordCrypt: string) {
    return await compare(password, passwordCrypt);
  }

  userAdmin() {
    return '@trademaster.com.br';
  }

  passwordAdmin() {
    const date = new Date();
    const dia =
      `${date.getDay()}`.length === 1
        ? `0${date.getDay()}`
        : `${date.getDay()}`;
    const mes =
      `${date.getMonth()}`.length === 1
        ? `0${date.getMonth()}`
        : `${date.getMonth()}`;
    return `${date.getFullYear()}${mes}${dia}`;
  }
}
