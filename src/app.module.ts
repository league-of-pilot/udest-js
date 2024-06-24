import { Module } from '@nestjs/common'
import { MessagesModule } from './messages/messages.module'
import { UsersModule } from './users/users.module'
import { ReportsModule } from './reports/reports.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/user.entity'
import { Report } from './reports/reports.entity'
import { DemosModule } from './demos/demos.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { join } from 'path'

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    MessagesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    // https://docs.nestjs.com/fundamentals/dynamic-modules#custom-options-factory-class
    TypeOrmModule.forRootAsync({
      // https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: join('_ignore_mock', configService.get('DB_NAME')),
        entities: [User, Report],
        synchronize: true
      })
    }),
    // https://thriveread.com/nestjs-typeorm-sqlite/
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: '_ignore_mock/db.sqlite',
    //   entities: [User, Report],
    //   synchronize: true
    // }),

    DemosModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
