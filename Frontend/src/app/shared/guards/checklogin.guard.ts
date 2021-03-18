import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../pages/auth/auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckloginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLogged.pipe(
      take(1),
      map((isLogged) => {
       const usr = this.authService.isUser$;
        // si estoy logueado me devuelve true y si no false

       if (isLogged === true){

        if (usr.role === 1){
          this.router.navigate(['/homeUser']);
          return false;
        }else if (usr.role === 2){
          this.router.navigate(['/homeAdmin']);
        }
        return false;
          }
       return true;
      })
    );
  }
}
