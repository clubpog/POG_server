import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CommonResponseFormInterceptor } from '@app/common-config/interceptors';
import { RoleEntity, UserEntity } from '@app/entity/domain/user';

import { AppService } from './app.service';
import { UserShowDto } from './dto/userShow.dto';

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
}
