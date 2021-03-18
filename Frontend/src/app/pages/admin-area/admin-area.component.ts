import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './../user/services/users.service';
import { AuthService } from './../auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

const helper = new JwtHelperService();
@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {
  isAdmin = null;
  newEdit: any = {};
  mydates: any = [];
  feth: any;
  isLogged = false;
  data: any;
  private destroy$ = new Subject<any>();
  user: any;
  searchForm = this.fb.group({
    matricula: ['', [Validators.required, Validators.minLength(6)]]
  });

  newForm = this.fb.group({
    mat: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    asunto: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: ['', [Validators.required, Validators.minLength(5)]],
    fecha: [[Validators.required, Validators.minLength(5)]],
    forario: ['', [Validators.required, Validators.minLength(5)]],
    area: ['', [Validators.required, Validators.minLength(5)]],
    estado: ['pendiente', [Validators.required, Validators.minLength(5)]],
  });
  constructor(public authService: AuthService, private userService: UsersService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    const onUser = this.authService.isUser$;
    const descrypt = helper.decodeToken(onUser.token);
    this.userService.getAll().subscribe(res => {
      this.data = res;
      for (const citasA of this.data){
        if (citasA.area === descrypt.uA){
          this.mydates.push(citasA);
        }
      }
    });
    this.authService.isLogged.pipe(takeUntil(this.destroy$)).subscribe((res) => (this.isLogged = res));
    this.authService.isAdmin$.pipe(takeUntil(this.destroy$)).subscribe(res => (this.isAdmin = res));
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onReset(): void {
    location.reload();
  }
  onSave(): void {
    if (this.newForm.invalid) {
      Swal.fire({
        icon: 'info',
        title: 'Verifica tus datos',
        confirmButtonText: 'OK'
      });
      return;
    }
    try {
      const formValue = this.newForm.value;
      this.userService.new(formValue).subscribe((res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Cita Exitosa',
          text: 'Se ha agendado la cita correctamente'
        }).then((result) => {
          if (result.isConfirmed) {
            this.onReset();
          }
        });
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error, intente nuevamente',
      });
    }
  }

  onSearch(): void {
    console.log(this.searchForm.value);
    if (this.searchForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error, la matrícula debe contener 6 dígitos',
      });
      return;
    }
    const id = Object.values(this.searchForm.value);
    const params = Number(id[0]);
    this.userService.getById(params).subscribe((res) => {
      this.data = res;
    });
  }

  outEdit(data = {}): void {
    moment.locale('es');
    this.newEdit = data;
    this.newEdit.fecha = moment(this.newEdit.fecha).format('YYYY-MM-D');
    
  }
  onEdit() {
    const dateE = this.newEdit;
    const idEdit = this.newEdit.id;
    this.userService.update(idEdit, dateE).subscribe((res: any) => {
      this.onReset();
    });
  }
  
  deleteDate(id: number): any {
    if (Swal.fire({
      title: '¿Estás seguro de eliminar esta cita?',
      text: "Si eliminas esta cita, no podras recuperarla más tarde",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService
          .delete(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
            Swal.fire({
              icon: 'success',
              title: 'Cita eliminada con éxito',
            });
            this.userService.getAll().subscribe((user) => {
              user.sort();
              user.reverse();
              this.data = user;
            });
          });
      }
    })) 
    {
    }
  }
  
  onLogout(): void {
    this.authService.logout();
  }
  // tslint:disable-next-line:typedef
  getErrorMessage(field: string) {
    let message;
    if (this.newForm.get(field).errors.required) {

      message = 'El campo es requerido';

    } else if (this.newForm.get(field).hasError('minlength')) {

      message = 'El minimo de caracteres es 6';

    }
    return message;
  }
  // tslint:disable-next-line:typedef
  isValidate(field: string) {
    return (this.newForm.get(field).touched || this.newForm.get(field).dirty) &&
      !this.newForm.get(field).valid;
  }

  // tslint:disable-next-line:typedef
  formatDate(fecha: string){
    moment.locale('es');
    const dTE = moment(fecha).format('D MMMM YYYY');
    return dTE;
  }
  }
