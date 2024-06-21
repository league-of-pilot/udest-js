import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from './user.entity'

export const CurrentUser = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ currentUser: User }>()
    return request.currentUser
  }
)
