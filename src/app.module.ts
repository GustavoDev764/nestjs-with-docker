import { Module } from '@nestjs/common';
import { AppController } from '@App/app.controller';
import { AppService } from '@App/app.service';
import { DatabaseModule } from '@App/database/database.module';
import { ConfigModule } from '@App/config/config.module';
import { ConfigService } from '@App/config/config.service';
import { Configuration } from '@App/config/config.keys';
import { UsersModule } from '@App/users/users.module';
import { AuthModule } from '@App/auth/auth.module';

@Module({
  imports: [DatabaseModule, ConfigModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
