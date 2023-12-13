import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from "rxjs";

@Injectable()
export class WrapDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(`before request interceptor`);
    return next.handle().pipe(
      map((data)=> {
        console.log(`after response interceptor`, data);
        return { data: data };
      })
    );
  }
}
