import { Module } from '@nestjs/common'
import { MessagesModule } from './messages/messages.module'
import { UsersModule } from './users/users.module'
import { ReportsModule } from './reports/reports.module'

@Module({
  imports: [UsersModule, ReportsModule, MessagesModule],
  controllers: [],
  providers: []
})
export class AppModule {}
