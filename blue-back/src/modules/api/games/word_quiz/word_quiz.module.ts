import { Module } from '@nestjs/common';
import { WordQuizController } from './word_quiz.controller';
import { WordQuizService } from './word_quiz.service';

@Module({
  controllers: [WordQuizController],
  providers: [WordQuizService],
  exports: [WordQuizService], // 다른 모듈에서 사용할 경우
})
export class WordQuizModule {}