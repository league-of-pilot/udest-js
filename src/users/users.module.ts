import { MiddlewareConsumer, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { AuthService } from './auth.service'
import { CurrentUserMiddleware } from './current-user.middleware'
import { MessagesController } from 'src/messages/messages.controller'
// import { MessagesModule } from 'src/messages/messages.module'
// import { CurrentUserInterceptor } from './current-user.interceptor'
// import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor
    // }
  ]
})

// Tuy nhiên cần phải đảm bảo currentUser middleware chạy sau seassion middleware
// https://docs.nestjs.com/middleware#middleware-consumer
// https://docs.nestjs.com/middleware#applying-middleware
// Apply như vậy ko hay lắm vì phải import MessagesController vào đây
// TODO - check lại logic, nếu đẩy lên app thì cần đảm bảo thứ tự chạy
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes(UsersController, MessagesController)
  }
}
