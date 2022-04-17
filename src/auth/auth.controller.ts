import { Body, Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/signin.dto';

@Controller('api')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Get('/login')
  async signin(@Query() singInDto: SingInDto) {
    return this._authService.signin(singInDto);
  }
}
