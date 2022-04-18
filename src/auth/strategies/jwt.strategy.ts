import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { AuthRepository } from '@App/auth/auth.repository';
import { IJwtPayload } from '@App/auth/jwt-payload.interface';
import fileConfig from '@OrmConfig';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: fileConfig.jwtsecret,
    });
  }

  async validate(payload: IJwtPayload): Promise<IJwtPayload> {
    const { username } = payload;
    const user = await this._authRepository.findOne({
      where: { user: username, status: 'ACTIVE' },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
