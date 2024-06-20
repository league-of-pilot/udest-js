import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { Observable, map } from 'rxjs'
import { ClassContructor } from 'src/app.type'

// vấn đề ràng type với decorator ko được ts support tốt
// Hiện chỉ ràng buộc dto phải là class
// Việc cố gắng ràng buộc data trùng class rất khó

export function Serialize(dto: ClassContructor) {
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
