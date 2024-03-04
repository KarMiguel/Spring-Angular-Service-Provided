import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component'
import { ClientModule } from './client/client.module';
import { CustomersService } from './customers.service';
import { HttpClientModule} from '@angular/common/http';
import { ServiceProvidedModule } from './service-provided/service-provided.module';
import { ServicePrestadoService } from './service-prestado.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    ClientModule,
    ServiceProvidedModule,
    FormsModule
  ],
  providers: [
    CustomersService,
    ServicePrestadoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {  }
