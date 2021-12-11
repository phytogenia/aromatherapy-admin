import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderLayoutComponent } from './components/header-layout/header-layout.component';
import { CrudLayoutComponent } from './components/crud-layout/crud-layout.component';
import { GridLayoutComponent } from './components/crud-layout/grid-layout/grid-layout.component';
import { DetailLayoutComponent } from './components/crud-layout/detail-layout/detail-layout.component';
import { StatsLayoutComponent } from './components/stats-layout/stats-layout.component';
import { AuthComponent } from './auth/auth.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderLayoutComponent,
    CrudLayoutComponent,
    GridLayoutComponent,
    DetailLayoutComponent,
    StatsLayoutComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
