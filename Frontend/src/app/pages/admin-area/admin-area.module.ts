import { FormCitaModule } from './../form-cita/form-cita.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAreaRoutingModule } from './admin-area-routing.module';
import { AdminAreaComponent } from './admin-area.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminAreaComponent],
  imports: [
    CommonModule,
    AdminAreaRoutingModule,
    FormCitaModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminAreaModule { }
