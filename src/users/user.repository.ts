/* eslint-disable @typescript-eslint/ban-types */
import { Repository, EntityRepository } from 'typeorm';
import { hash, genSalt } from 'bcryptjs';
import { UserEntity } from '@App/users/entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findAll() {
    return this.findAll();
  }

  async cryptPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }
}
