import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CommonResponseFormInterceptor } from '@app/common-config/interceptors';
import { RoleEntity, UserEntity } from '@app/entity/domain/user';

import { AppService } from './app.service';
import { UserShowDto } from './dto/UserShow.dto';
import { UserSignupReq } from './dto/UserSignupReq.dto';
import { plainToClass } from 'class-transformer';

@UseInterceptors(CommonResponseFormInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): UserEntity {
    return new UserEntity({
      id: 1,
      firstName: 'Kildong',
      lastName: 'Hong',
      password: 'password',
      role: new RoleEntity({ id: 1, name: 'admin' }),
    });
  }

  @Get('user')
  getUser(): UserShowDto {
    return new UserShowDto({
      id: 1,
      firstName: 'Kildong',
      lastName: 'Hong',
    });
  }

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
