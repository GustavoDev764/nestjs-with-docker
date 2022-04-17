import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async create({ name, user, password }: CreateUserDto) {
    const passwordCrypt = await this._userRepository.cryptPassword(password);

    const savedUser: UserEntity = await this._userRepository.save({
      name,
      user,
      password: passwordCrypt,
    });

    return savedUser;
  }

  async update(id: number, data: any) {
    if (data.user) {
      const user = await this._userRepository.findOne({
        where: { user: data?.user },
      });

      if (user && `${user.id}` !== `${id}`) {
        throw new BadRequestException(['The user already exists']);
      }
    }

    if (data.password) {
      const passwordCrypt = await this._userRepository.cryptPassword(
        data.password,
      );

      const nwData = { ...data, password: passwordCrypt };

      await this._userRepository.update(id, nwData);
    } else {
      await this._userRepository.update(id, data);
    }

    return await this._userRepository.findOne(id);
  }

  async findAll() {
    const data = await this._userRepository.findAll();
    return data;
  }

  async findOne(id: number) {
    const data = await this._userRepository.findOne(id);
    return data;
  }
}
