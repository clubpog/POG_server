import { CommonResponseFormInterceptor } from './common/interceptors/common.response.form.interceptor';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';

@UseInterceptors(CommonResponseFormInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
