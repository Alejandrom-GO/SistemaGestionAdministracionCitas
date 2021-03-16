import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { UserResponse, User, Roles } from '../../shared/models/user.interface';
import { catchError, map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<Roles>(null);
  private usr = new BehaviorSubject<User>(null);
  private userToken = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get isAdmin$(): Observable<string> {
    return this.role.asObservable();
  }

  get userTokenValue$(): string {
    return this.userToken.getValue();
  }
  get isUser$(): any {
     return this.usr.getValue();
  }

  login(authData: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${environment.API_URL}auth/login`, authData)
      .pipe(
        map((res: UserResponse) => {
        this.saveStorage(res);
        this.usr.next(res);
        this.loggedIn.next(true);
        this.role.next(res.role);
        this.userToken.next(res.token);
        return res;
        }),
        catchError((err) => this.handlerError(err))
      );
  }
  logout(): void {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.role.next(null);
    this.userToken.next(null);
    this.usr.next(null);
    this.router.navigate(['/login']);

    // set userisLogged = false
  }
  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    if (user){
      const isExired = helper.isTokenExpired(user.token);

      if (isExired) {
        window.alert('Tu sesion ha expirado. Vuelve a iniciar sesion');
        this.logout();
      }else{
        this.loggedIn.next(true);
        this.role.next(user.role);
        this.userToken.next(user.token);
        this.usr.next(user);
      }
    }
  }
  private saveStorage(user: UserResponse): void {
  // localStorage.setItem('token', token);
    const { message, code, mat, area, userId, ... rest} = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }
  private handlerError(err): Observable<never> {
    let errorMessage = ' An error ocurred retrieving data';
    if (err) {
      errorMessage = 'Usuario o password incorrectos';
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  isRole$() {
    return this.role.getValue();
  }
}
