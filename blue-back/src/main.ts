import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // API 라우터에 /api 접두사 설정
  app.setGlobalPrefix('api');
  
  // 정적 파일 서빙 설정
  app.useStaticAssets(join(__dirname, '..', 'public'));
  
  // SPA를 위한 fallback 설정
  app.use((req, res, next) => {
    if (req.url.startsWith('/api')) { // API 요청은 그대로 진행
      next();
    } else if (req.url.includes('.') && !req.url.includes('index.html')) {  // 정적 파일 요청 (CSS, JS, 이미지 등)
      next();
    } else {
      res.sendFile(join(__dirname, '..', 'public', 'index.html'));
    }
  });

  await app.listen(6974);
}
bootstrap();
