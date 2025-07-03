import { Injectable } from '@nestjs/common';
import { CreateWordQuizDto } from './dto/create-word_quiz.dto';
import { UpdateWordQuizDto } from './dto/update-word_quiz.dto';

@Injectable()
export class WordQuizService {
  create(createWordQuizDto: CreateWordQuizDto) {
    return 'This action adds a new wordQuiz';
  }

  findAll() {
    return `This action returns all wordQuiz`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wordQuiz`;
  }

  update(id: number, updateWordQuizDto: UpdateWordQuizDto) {
    return `This action updates a #${id} wordQuiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} wordQuiz`;
  }
}
