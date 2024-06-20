import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  app.use(
    session({
      secret: 'session-secret-demo',
      resave: false,
      saveUninitialized: false
    })
  )

  await app.listen(3696)
}
bootstrap()
