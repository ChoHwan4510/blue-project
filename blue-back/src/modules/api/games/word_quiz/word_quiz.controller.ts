import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WordQuizService } from './word_quiz.service';
import { CreateWordQuizDto } from './dto/create-word_quiz.dto';
import { UpdateWordQuizDto } from './dto/update-word_quiz.dto';

@Controller('word-quiz')
export class WordQuizController {
  constructor(private readonly wordQuizService: WordQuizService) {}

  @Post()
  create(@Body() createWordQuizDto: CreateWordQuizDto) {
    return this.wordQuizService.create(createWordQuizDto);
  }

  @Get()
  findAll() {
    return this.wordQuizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordQuizService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWordQuizDto: UpdateWordQuizDto) {
    return this.wordQuizService.update(+id, updateWordQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordQuizService.remove(+id);
  }
}
