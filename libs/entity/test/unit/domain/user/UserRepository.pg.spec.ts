// import { Favorite } from '@app/entity/domain/favorite/Favorite.entity';
// import { FavoriteModule } from '@app/entity/domain/favorite/FavoriteModule';
// import { Test, TestingModule } from '@nestjs/testing';
// import { User } from '@app/entity/domain/user/User.entity';
// import { getConnection, Repository } from 'typeorm';
// import { UserModule } from '@app/entity/domain/user/UserModule';
// import { ConfigModule } from '@nestjs/config';
// import { AuthConfig, ValidationSchema } from '@app/common-config/config';
// import { getTypeOrmModule } from '../../../../getTypeOrmModule';

// describe('UserRepository', () => {
//   let userRepository: Repository<User>;
//   let favoriteRepository: Repository<Favorite>;

//   beforeAll(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [
//         UserModule,
//         FavoriteModule,
//         ConfigModule.forRoot({
//           load: [AuthConfig],
//           isGlobal: true,
//           validationSchema: ValidationSchema,
//         }),
//         getTypeOrmModule(),
//       ],
//     }).compile();

//     userRepository = module.get('UserRepository');
//     favoriteRepository = module.get('FavoriteRepository');

//     await userRepository.delete({});
//     await favoriteRepository.delete({});
//   });

//   afterEach(async () => {
//     await userRepository.delete({});
//     await favoriteRepository.delete({});
//   });

//   afterAll(async () => {
//     await getConnection().close();
//   });

//   it('save', async () => {
//     // given
//     const userId = 'test';
//     const password = 'test';
//     const deviceId = 'test';
//     const firebaseToken = 'test';

//     const user = new User();
//     user.userId = userId;
//     user.password = password;
//     user.deviceId = deviceId;
//     user.firebaseToken = firebaseToken;

//     // when
//     const savedUser = await userRepository.save(user);

//     // then
//     expect(savedUser.id).not.toBeNull();
//   });
// });
