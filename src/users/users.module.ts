import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';
import { UserUniqueRule } from './validator/uniqueuser.validator';
import { UserExistsRule } from './validator/exitsuser.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [UsersService, UserEntity, UserUniqueRule, UserExistsRule],
})
export class UsersModule {}
