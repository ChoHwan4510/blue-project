import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { QuizModule } from './quiz/quiz.module';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [
    QuizModule,
  ]
})
export class ApiModule {}
