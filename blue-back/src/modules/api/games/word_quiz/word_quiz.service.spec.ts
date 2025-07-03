import { Test, TestingModule } from '@nestjs/testing';
import { WordQuizService } from './word_quiz.service';

describe('WordQuizService', () => {
  let service: WordQuizService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordQuizService],
    }).compile();

    service = module.get<WordQuizService>(WordQuizService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
