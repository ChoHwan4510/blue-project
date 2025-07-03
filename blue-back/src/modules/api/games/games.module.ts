import { Module } from '@nestjs/common';
import { WordQuizModule } from './word_quiz/word_quiz.module';

@Module({
  imports: [
    WordQuizModule,
  ],
})
export class GamesModule {}