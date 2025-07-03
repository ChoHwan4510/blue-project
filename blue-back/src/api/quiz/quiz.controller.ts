import { Controller, Get, Post, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('api/quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('get')
  getQuestion() {
    return this.quizService.generateQuestion();
  }

  @Post('answer')
  checkAnswer(@Body() body: { question: string; answer: string }) {
    return this.quizService.checkAnswer(body.question, body.answer);
  }
} 