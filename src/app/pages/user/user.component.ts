import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './../user/services/users.service';
import { AuthService } from './../auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
   userRole = JSON.parse(localStorage.getItem('user'));
  private destroy$ = new Subject<any>();
  data: any;
  mydates:any = [];
  newForm = this.fb.group({
    userId: [this.userRole.userId, [Validators.required, Validators.minLength(1)]],
    asunto: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: ['', [Validators.required, Validators.minLength(5)]],
    fecha: ['', [Validators.required, Validators.minLength(5)]],
    forario: ['', [Validators.required, Validators.minLength(5)]],
    area: ['', [Validators.required, Validators.minLength(5)]],
    estado: ['pendiente', [Validators.required, Validators.minLength(5)]],
  });
  constructor( 
    public authService: AuthService,
    private userService: UsersService, 
    private router: Router, 
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(res => {
      this.data = res;
      for (const cita of this.data){
        if (cita.user.id === this.userRole.userId){
        this.mydates.push(cita);
        }
      }


    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }


  
  onSave(): void{
    if (this.newForm.invalid) {
      return;
    }
    const formValue = this.newForm.value;
    console.log(formValue);
    this.userService.new(formValue).subscribe((res) => {
      console.log(res);
    });
  }

  onEdit(data = {}): void{
    console.log(data);
    }

  onLogout(): void {
    this.authService.logout();
  }
  // tslint:disable-next-line:typedef
  getErrorMessage(field: string){
    let message;
    if(this.newForm.get(field).errors.required){
      message = "El campo es requerido";
    }else if (this.newForm.get(field).hasError('minlength') ) {
        message = 'El minimo de caracteres es 6';
    }
    return message;
  }
  // tslint:disable-next-line:typedef
  isValidate(field: string){
    return(this.newForm.get(field).touched || this.newForm.get(field).dirty) &&
    !this.newForm.get(field).valid;
  }
  deleteDate(id: number): any {
    if(window.confirm('Do you really want remove')){
      this.userService
      .delete(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        window.alert('Cita Eliminada');
        this.userService.getAll().subscribe((user) => {
         user.sort();
         user.reverse();
         this.data = user;
       });
 
      });
    }
   }
}
