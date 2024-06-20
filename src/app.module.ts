import { Module } from '@nestjs/common'
import { MessagesModule } from './messages/messages.module'
import { UsersModule } from './users/users.module'
import { ReportsModule } from './reports/reports.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '_ignore_mock/db.sqlite',
      entities: [],
      synchronize: true
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
