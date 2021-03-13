import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCitaComponent } from './form-cita.component';

const routes: Routes = [{ path: '', component: FormCitaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormCitaRoutingModule { }
