import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@App/config/config.module';
import { ConfigService } from '@App/config/config.service';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from '@App/config/config.keys';

export const DatabaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        type: config.get(Configuration.TYPEDATABASE),
        host: config.get(Configuration.HOST),
        port: config.get(Configuration.PORTDATABASE),
        database: config.get(Configuration.DATABASE),
        username: config.get(Configuration.USERNAME),
        password: config.get(Configuration.PASSWORD),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: true,
      } as ConnectionOptions;
    },
  }),
];
