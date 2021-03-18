import { Router } from '@angular/router';
import { UsersService } from './../user/services/users.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  isAdmin = null;
  newEdit: any = {};
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
    this.user = this.authService.isUser$;
    this.userService.getAll().subscribe(res => {
      res.sort();
      res.reverse();
      this.data = res;
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
      window.alert('Verifica tus datos');
      return;
    }
    try {
      const formValue = this.newForm.value;
      formValue.fecha = moment(formValue.fecha).format('D MMMM YYYY');
      console.log(formValue.fecha);
      this.userService.new(formValue).subscribe((res: any) => {
        window.alert('Cita creada con exito');
        location.reload();
      });
    } catch (error) {
      window.alert('Algo salio mal, intenta mas tarde...');
    }
  }

  onSearch(): void {
    if (this.searchForm.invalid) {
      window.alert('La matricula dede de tener 6 digitos');
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
    this.newEdit.fecha = moment(this.newEdit.fecha).format('YYYY-MM-DD');


  }
  onEdit() {
    const dateE = this.newEdit;
    dateE.fecha = moment(this.newEdit.fecha).add(1, 'days').format('YYYY-MM-DD');
    const idEdit = this.newEdit.id;

    this.userService.update(idEdit, dateE).subscribe((res: any) => {
      this.onReset();
    });
  }

  deleteDate(id: number): any {
    if (window.confirm('Desea eliminar la cita')) {
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
  formatDate(fecha: string) {
    moment.locale('es');
    const dTE = moment(fecha).format('DD-MMMM-YYYY');
    return dTE;
  }
}
