import { Injectable } from '@nestjs/common';

const WORDS = [
  '사과', '바나나', '포도', '고양이', '강아지', '학교', '컴퓨터', '자동차', '비행기', '커피'
];

function toConsonants(word: string): string {
  const CHO = [
    'ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'
  ];
  return word
    .split('')
    .map(char => {
      const code = char.charCodeAt(0) - 44032;
      if (code < 0 || code > 11171) return char;
      return CHO[Math.floor(code / 588)];
    })
    .join('');
}

@Injectable()
export class QuizService {
  generateQuestion() {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    const question = toConsonants(word);
    return { question, answerLength: word.length };
  }

  checkAnswer(question: string, answer: string) {
    const isCorrect = WORDS.some(
      w => toConsonants(w) === question && w === answer
    );
    return { correct: isCorrect };
  }
} 