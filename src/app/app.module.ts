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
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    ClientModule,
    ServiceProvidedModule
  ],
  providers: [
    CustomersService,
    ServicePrestadoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {  }
