import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicProvideFormComponent } from './servic-provide-form/servic-provide-form.component';
import { ServicProvideListComponent } from './servic-provide-list/servic-provide-list.component';
import { LayoutComponent } from '../layout/layout.component';

const routes: Routes = [
  {path:'services-provided',component: LayoutComponent, children:[
    {path:'forms',component: ServicProvideFormComponent},
    {path:'list',component: ServicProvideListComponent},
    {path:'', redirectTo:'/services-provided/list', pathMatch:'full'}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProvidedRoutingModule { }
