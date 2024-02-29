import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceProvidedRoutingModule } from './service-provided-routing.module';
import { ServicProvideFormComponent } from './servic-provide-form/servic-provide-form.component';
import { ServicProvideListComponent } from './servic-provide-list/servic-provide-list.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ServicProvideFormComponent,
    ServicProvideListComponent
  ],
  imports: [
    CommonModule,
    ServiceProvidedRoutingModule,
    FormsModule,
    RouterModule
  ],exports:[
    ServicProvideFormComponent,
    ServicProvideListComponent
  ]
})
export class ServiceProvidedModule { }
