/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';

@ValidatorConstraint({ name: 'IsUniqueUser', async: true })
@Injectable()
export class UserUniqueRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
  ) {}

  async validate(value: any) {
    try {
      await this.usersRepository.findOneOrFail({ where: { user: value } });
    } catch (e) {
      //Usuario ja existe
      return true;
    }

    //Usuario não existe
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `The user already exists`;
  }
}

export function IsUniqueUser(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUniqueUser',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserUniqueRule,
    });
  };
}
