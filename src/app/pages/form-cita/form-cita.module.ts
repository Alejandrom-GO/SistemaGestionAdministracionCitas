import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormCitaRoutingModule } from './form-cita-routing.module';
import { FormCitaComponent } from './form-cita.component';


@NgModule({
  declarations: [FormCitaComponent],
  imports: [
    CommonModule,
    FormCitaRoutingModule
  ],
  exports: [
    FormCitaComponent
  ]
})
export class FormCitaModule { }
