import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { ApiController } from './api/api.controller';
import { User } from './entities/test.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME || 'hina',
      password: process.env.DB_PASSWORD || 'hinadaisuki1004@',
      database: process.env.DB_NAME || 'blue_project',
      entities: [User],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      synchronize: false,
      logging: true,
      autoLoadEntities: true,
    }),
    ApiModule,
  ],
  controllers: [ApiController, AppController],
  providers: [AppService],
})
export class AppModule {} 