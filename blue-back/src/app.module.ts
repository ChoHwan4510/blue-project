import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { ApiController } from './api/api.controller';

@Module({
  imports: [ApiModule],
  controllers: [ApiController,AppController],
  providers: [AppService],
})
export class AppModule {}
