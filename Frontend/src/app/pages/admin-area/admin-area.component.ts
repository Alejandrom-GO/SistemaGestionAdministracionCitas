import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './../user/services/users.service';
import { AuthService } from './../auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {
  data: any;
  newForm = this.fb.group({
    userId: ['2', [Validators.required, Validators.minLength(1)]],
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
      res.sort();
      res.reverse();
      this.data = res;
    });
  }
  onSave(): void{
    if (this.newForm.invalid) {
      return;
    }
    const formValue = this.newForm.value;
    this.userService.new(formValue).subscribe((res) => {
      console.log(res);
    });
  }
  onEdit(data = {}):void{
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
  }
