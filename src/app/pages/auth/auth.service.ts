import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { UserResponse, User, Roles } from '../../shared/models/user.interface';
import { catchError, map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<Roles>(null);
  private user = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get isAdmin$(): Observable<string> {
    return this.role.asObservable();
  }

  get user$(): string {
    return this.user.getValue();
  }

  login(authData: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${environment.API_URL}auth/login`, authData)
      .pipe(
        map((res: UserResponse) => {
        this.saveStorage(res);
        this.loggedIn.next(true);
        this.role.next(res.role);
        this.user.next(res.token);
        return res;
        }),
        catchError((err) => this.handlerError(err))
      );
  }
  logout(): void {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);

    // set userisLogged = false
  }
  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    if (user){
      const isExired = helper.isTokenExpired(user.token);

      if (isExired) {
        this.logout();
      }else{
        this.loggedIn.next(true);
        this.role.next(user.role);
        this.user.next(user.token);
      }
    }
  }
  private saveStorage(user: UserResponse): void {
  // localStorage.setItem('token', token);
    const {userId, message, ... rest} = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }
  private handlerError(err): Observable<never> {
    let errorMessage = ' An error ocurred retrieving data';
    if (err) {
      errorMessage = `Error : code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  isRole$() {
    return this.role.getValue();
  }
}
