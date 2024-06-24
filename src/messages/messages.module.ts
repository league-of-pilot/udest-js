import { Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { MessagesController } from './messages.controller'
import { MessagesRepo } from './messages.repo'
import { MessagesService } from './messages.service'

@Module({
  imports: [UsersModule],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepo]
})
export class MessagesModule {}
