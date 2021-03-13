import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatesComponent } from './dates.component';

const routes: Routes = [{ path: '', component: DatesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatesRoutingModule { }
