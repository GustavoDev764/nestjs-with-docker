import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@App/auth/auth.service';
import { AuthController } from '@App/auth/auth.controller';
import { AuthRepository } from '@App/auth/auth.repository';
import { JwtStrategy } from '@App/auth/strategies/jwt.strategy';
import fileConfig from '@OrmConfig';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: fileConfig.jwtsecret,
          signOptions: {
            expiresIn: 3600,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
