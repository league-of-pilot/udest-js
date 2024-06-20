import { Module } from '@nestjs/common'
import { MessagesModule } from './messages/messages.module'
import { UsersModule } from './users/users.module'
import { ReportsModule } from './reports/reports.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/user.entity'
import { Report } from './reports/reports.entity'
import { DemosModule } from './demos/demos.module'

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    // https://thriveread.com/nestjs-typeorm-sqlite/
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '_ignore_mock/db.sqlite',
      entities: [User, Report],
      synchronize: true
    }),
    DemosModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
