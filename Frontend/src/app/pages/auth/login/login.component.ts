import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../shared/models/user.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscripcions: Subscription = new Subscription();
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
    ){}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    //  this.suscripcion.forEach(sub => sub.unsubscribe());
    this.subscripcions.unsubscribe();

    }
  onLogin(): void{
    if (this.loginForm.invalid) {
      return;
    }
    const formValue = this.loginForm.value;
    this.subscripcions.add(
    this.authService.login(formValue).subscribe((res) => {
      const Ures = this.authService.isUser$;
      if (res && Ures.role === 'admin'){
        this.router.navigate(['homeAdmin']);
      }else if (res && Ures.role === 'user'){
        this.router.navigate(['homeUser']);
      }else if (res && Ures.role === 'adminArea'){
        this.router.navigate(['homeArea']);
      }
    }
    )
    );
  }



  getErrorMessage(field: string): string{
  let message;
  if (this.loginForm.get(field).errors.required){
    message = "El campo es requerido";
  }else if (this.loginForm.get(field).hasError('minlength') ) {
      message = 'El minimo de caracteres es 6';
  }else if (this.loginForm.get(field).hasError('maxlength') ) {
    message = 'El maximo de caracteres es 6';
}
  return message;
  }

  // tslint:disable-next-line:typedef
  isValidate(field: string){
  return(this.loginForm.get(field).touched || this.loginForm.get(field).dirty) &&
  !this.loginForm.get(field).valid;
  }
}
