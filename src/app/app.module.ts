import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelAdminComponent } from './components/panel-admin/panel-admin.component';
import { PanelAdminAreaComponent } from './components/panel-admin-area/panel-admin-area.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelAdminComponent,
    PanelAdminAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
