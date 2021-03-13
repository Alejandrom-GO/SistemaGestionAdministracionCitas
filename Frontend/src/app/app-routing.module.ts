import { IsUserGuard } from './shared/guards/is-user.guard';
import { IsAdminGuard } from './shared/guards/is-admin.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckloginGuard } from './shared/guards/checklogin.guard';

const routes: Routes = [


  { path: 'homeUser', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
  canActivate: [ IsUserGuard] },
  { path: 'homeAdmin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
  canActivate: [ IsAdminGuard]  },
  { path: 'homeArea', loadChildren: () => import('./pages/admin-area/admin-area.module').then(m => m.AdminAreaModule) },
 
  { path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule), canActivate: [CheckloginGuard]},
  { path: 'formCita', loadChildren: () => import('./pages/form-cita/form-cita.module').then(m => m.FormCitaModule) },
  {path: '**', redirectTo: 'login' , pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
