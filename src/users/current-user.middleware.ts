import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { UsersService } from './users.service'

// Interceptros chạy sau Guard nên ko thể gán kịp user vào request
// Cần phải đổi lại thành Middleware
// https://docs.nestjs.com/faq/request-lifecycle#guards
// https://docs.nestjs.com/middleware
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {}

    if (userId) {
      const user = await this.userService.findOne(userId)
      req.currentUser = user
    }

    next()
  }
}
