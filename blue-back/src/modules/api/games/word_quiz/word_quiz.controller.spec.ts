import { Test, TestingModule } from '@nestjs/testing';
import { WordQuizController } from './word_quiz.controller';
import { WordQuizService } from './word_quiz.service';

describe('WordQuizController', () => {
  let controller: WordQuizController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordQuizController],
      providers: [WordQuizService],
    }).compile();

    controller = module.get<WordQuizController>(WordQuizController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
