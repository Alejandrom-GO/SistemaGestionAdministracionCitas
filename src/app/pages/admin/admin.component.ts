import { UsersService } from './../user/services/users.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject} from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
isAdmin = null;
isLogged = false;

private destroy$ = new Subject<any>();
  constructor(public authService: AuthService, private userService: UsersService) { 
    
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe(res => console.log(res));
    this.authService.isLogged.pipe(takeUntil(this.destroy$)).subscribe((res) => (this.isLogged = res));
    this.authService.isAdmin$.pipe(takeUntil(this.destroy$)).subscribe(res => (this.isAdmin = res));
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }



  onLogout(): void {
    this.authService.logout();
  }
}
