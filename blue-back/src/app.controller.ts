import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  /*@Get('*')
  renderReact(@Res() res: Response) {
    res.sendFile(join(__dirname, 'public', 'index.html'));
  }*/

  constructor(private readonly appService: AppService) {}
    @Get(['/']) // SPA 라우트들 선언
    serveSPA(@Res() res: Response) {
      res.sendFile(join(__dirname, '..', 'public', 'index.html'));
    }
    
    // 또는 와일드카드 사용 (API 경로 제외)
    @Get('*')
    serveApp(@Res() res: Response) {
      res.sendFile(join(__dirname, '..', 'public', 'index.html'));
    }
}