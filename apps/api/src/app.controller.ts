import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CommonResponseFormInterceptor } from '@app/common-config/interceptors';

import { AppService } from './app.service';
import { UserSignupReq } from './user/dto/UserSignupReq.dto';
import { plainToClass } from 'class-transformer';

@UseInterceptors(CommonResponseFormInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('signup')
  async signup(@Body() dto: UserSignupReq): Promise<string | number> {
    try {
      console.log(dto); // 역직렬화 테스트
      const req = plainToClass(UserSignupReq, dto); // 역직렬화를 사용하면 이 로직은 불필요.
      console.log(req); // 역직렬화 테스트
      await this.appService.signup(dto);
      return 'ok';
    } catch (e) {
      return 1;
    }
  }
}
