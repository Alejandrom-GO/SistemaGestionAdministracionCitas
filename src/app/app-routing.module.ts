
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PanelAdminComponent } from './components/panel-admin/panel-admin.component';
import { PanelAdminAreaComponent } from './components/panel-admin-area/panel-admin-area.component';
import { PanelUserComponent } from './components/panel-user/panel-user.component';
import { LoginComponent } from './components/login/login.component';
import { GenerarCitaComponent } from './components/generar-cita/generar-cita.component';

const routes: Routes = [
  {path: 'panelAdmin', component: PanelAdminComponent},
  {path: 'panelArea', component: PanelAdminAreaComponent},
  {path: 'panelUser', component: PanelUserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'generaCita', component: GenerarCitaComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
