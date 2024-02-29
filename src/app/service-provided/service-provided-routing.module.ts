import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicProvideFormComponent } from './servic-provide-form/servic-provide-form.component';
import { ServicProvideListComponent } from './servic-provide-list/servic-provide-list.component';

const routes: Routes = [
  {path:'service-provided-forms',component: ServicProvideFormComponent},
  {path:'service-provided-list',component: ServicProvideListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProvidedRoutingModule { }
