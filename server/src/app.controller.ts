import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealthCheck() {
    return {
      status: 'ok',
      message: 'MineSweeper API is running',
      timestamp: new Date().toISOString(),
    };
  }
}
