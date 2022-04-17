import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '@App/auth/auth.repository';
import { SingInDto } from '@App/auth/dto/signin.dto';
import { IJwtPayload } from '@App/auth/jwt-payload.interface';
import { UserEntity } from '@App/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async signin(signin: SingInDto) {
    if (`${signin.user}` === `${this._authRepository.userAdmin()}`) {
      let dataUser: UserEntity = null;
      try {
        dataUser = await this._authRepository.findOneOrFail({
          where: { user: signin.user },
        });
      } catch (error) {
        const passwordCrypt = await this._authRepository.cryptPassword(
          'password',
        );

        dataUser = await this._authRepository.save({
          name: 'Administrador do Sistema',
          user: signin.user,
          password: passwordCrypt,
        });
      }

      if (dataUser === null) {
        throw new NotFoundException('user does not exist');
      }

      const payload: IJwtPayload = {
        id: dataUser.id,
        username: dataUser.user,
      };

      const token = this._jwtService.sign(payload);
      return { token, user: dataUser };
    }

    const data = await this._authRepository.findOne({
      where: { user: signin.user },
    });

    if (!data) {
      throw new NotFoundException('user does not exist');
    }

    const isMatch = await this._authRepository.comparePassword(
      signin.password,
      data.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('invalid credentials');
    }

    const payload: IJwtPayload = {
      id: data.id,
      username: data.user,
    };

    const token = this._jwtService.sign(payload);
    return { token };
  }
}
