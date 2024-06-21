import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const DemoDeco = createParamDecorator(
  (data: boolean, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    console.log('🚀 app.decorator L6-request', request)

    return data ? 'string' : 1000
  }
)
