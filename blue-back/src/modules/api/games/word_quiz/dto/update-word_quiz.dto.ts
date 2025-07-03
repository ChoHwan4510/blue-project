import { PartialType } from '@nestjs/mapped-types';
import { CreateWordQuizDto } from './create-word_quiz.dto';

export class UpdateWordQuizDto extends PartialType(CreateWordQuizDto) {}
