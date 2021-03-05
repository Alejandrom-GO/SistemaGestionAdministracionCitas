import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
@Injectable()
export class DatesInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

  if (req.url.includes('api')){
    const authToken = this.authSvc.userTokenValue$;
    const authReq = req.clone({
     setHeaders: {
       auth: authToken,
     }
    });
    return next.handle(authReq);
  }
  return next.handle(req);
  }

}
