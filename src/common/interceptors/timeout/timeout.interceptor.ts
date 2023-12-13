import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from "@nestjs/common";
import { catchError, Observable, throwError, timeout, TimeoutError } from "rxjs";
import { Request } from "express";

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const getReq = context.switchToHttp();
    const req = getReq.getRequest<Request>();

    req.body = { ...req.body, username: 'felo' };

    return next.handle().pipe(
      timeout(3000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(()=> new RequestTimeoutException())
        }
        return err;
      })
    );
  }
}
