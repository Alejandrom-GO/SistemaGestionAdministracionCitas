import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelAdminComponent } from './components/panel-admin/panel-admin.component';
import { PanelAdminAreaComponent } from './components/panel-admin-area/panel-admin-area.component';
import { PanelUserComponent } from './components/panel-user/panel-user.component';
import { LoginComponent } from './components/login/login.component';
import { GenerarCitaComponent } from './components/generar-cita/generar-cita.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelAdminComponent,
    PanelAdminAreaComponent,
    PanelUserComponent,
    LoginComponent,
    GenerarCitaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
