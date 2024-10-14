import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Rota raiz da aplicação' })
  @ApiResponse({ status: 200, description: 'Hello' })
  getHello(): string {
    return this.appService.getHello();
  }
}