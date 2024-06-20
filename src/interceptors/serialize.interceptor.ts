import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { Observable, map } from 'rxjs'

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    // constructor(private dto: any){}

    return next.handle().pipe(
      map((data: any) =>
        // exclude toàn bộ properties ko có @Expose
        // plainToClass deprecated, use plainToInstance instead
        plainToInstance(this.dto, data, { excludeExtraneousValues: true })
      )
    )
  }
}
