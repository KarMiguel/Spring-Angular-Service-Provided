import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientListComponent } from './client-list/client-list.component';
import { LayoutComponent } from '../layout/layout.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  {path:'client',
  component: LayoutComponent,
    canActivate:[authGuard], 
    children:[
      {path:'forms',component: ClientFormComponent,},
      {path:'forms/:id',component: ClientFormComponent ,canActivate: [authGuard]},
      {path:'list',component: ClientListComponent},  
      {path:'', redirectTo:'/client/list', pathMatch:'full'},  
  ]}, 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
