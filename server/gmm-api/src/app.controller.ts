import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { UseInterceptors } from '@nestjs/common/decorators';

@Controller()
// @UseInterceptors(CacheInterceptor) 
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async health() {
    console.log('AppController.health()');
    return await this.appService.health();
  }
}
