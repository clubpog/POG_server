import { CommonResponseFormInterceptor } from '../../../libs/common-config/src/interceptors/common.response.form.interceptor';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { UserShowDto } from './dto/userShow.dto';
import { UserEntity } from '../../../libs/entity/src/domain/user/user.entity';
import { RoleEntity } from '../../../libs/entity/src/domain/user/role.entity';

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
