import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientListComponent } from './client-list/client-list.component';

const routes: Routes = 
[ 
  {path:'client-forms',component: ClientFormComponent},
  {path:'client-forms/:id',component: ClientFormComponent},
  {path:'client-list',component: ClientListComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
