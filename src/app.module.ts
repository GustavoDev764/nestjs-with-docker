import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@App/app.controller';
import { AppService } from '@App/app.service';
import { UsersModule } from '@App/users/users.module';
import { AuthModule } from '@App/auth/auth.module';
import fileConfig from '@OrmConfig';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;
  constructor() {
    AppModule.port = fileConfig.portserve;
  }
}
