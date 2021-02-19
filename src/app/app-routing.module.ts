
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PanelAdminComponent } from './components/panel-admin/panel-admin.component';
import { PanelAdminAreaComponent } from './components/panel-admin-area/panel-admin-area.component';

const routes: Routes = [
  {path: 'panelAdmin', component: PanelAdminComponent},
  {path: 'panelArea', component: PanelAdminAreaComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
