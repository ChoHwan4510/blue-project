import 'reflect-metadata';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './entities/test.entity';
import { Post } from './entities/post.entity';

// .env 파일 로드
config();

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'hina',
  password: process.env.DB_PASSWORD || 'hinadaisuki1004@',
  database: process.env.DB_NAME || 'blue_project',
  entities: [User, Post],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});