import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { AuthService } from './auth.service'
import { CurrentUserInterceptor } from './current-user.interceptor'
// import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    // https://docs.nestjs.com/interceptors#binding-interceptors
    // useGlobalInterceptors ko Dependency Injection được
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor
    // },
    CurrentUserInterceptor
  ],
  exports: [CurrentUserInterceptor, UsersService]
})
export class UsersModule {}
