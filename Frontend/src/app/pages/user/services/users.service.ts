import { AuthService } from 'src/app/pages/auth/auth.service';
import { Date } from './../../../shared/models/date.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
 
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private authsvr: AuthService) {}

  getAll(): Observable<Date[]> {
    return this.http
      .get<Date[]>(`${environment.API_URL}api/dates-all`)
      .pipe(catchError(this.handlerError));
  }

  getById(dateId: number): Observable<Date> {
    return this.http
      .get<any>(`${environment.API_URL}api/${dateId}`)
      .pipe(catchError(this.handlerError));
  }

  new(date: Date): Observable<Date> {
    return this.http
      .post<Date>(`${environment.API_URL}api/`, date)
      .pipe(catchError(this.handlerError));
  }

  update(dateId: number, date: Date): Observable<Date> {
    return this.http
      .put<Date>(`${environment.API_URL}api/${dateId}`, date)
      .pipe(catchError(this.handlerError));
  }

  delete(dateId: number): Observable<{}> {
    return this.http
      .delete<Date>(`${environment.API_URL}api/${dateId}`)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error): Observable<never> {
    const errorMessage = error.error.message;
    if (error.error.code === 404) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: errorMessage,
      });
    }
    return throwError(errorMessage);
  }
}
