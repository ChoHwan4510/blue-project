import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
    @Get('hello')
    getHello() {
    return { message: '헤으응 섹스' };
    }
}
