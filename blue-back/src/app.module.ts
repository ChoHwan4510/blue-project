import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { User } from './entities/test.entity';
import { join } from 'path';
import { GamesModule } from './modules/api/games/games.module';

@Module({
  imports: [
    // 정적 파일 서빙 모듈
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'], // API 경로 제외
    }),
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
    GamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 