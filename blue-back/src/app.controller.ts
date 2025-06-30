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
  @Get("*")
  getHello(): string {
    return this.appService.getHello();
  }
}