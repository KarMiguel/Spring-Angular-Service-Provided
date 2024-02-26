import { Component,OnInit } from '@angular/core';
import { Client } from '../client';
import { CustomersService } from 'src/app/customers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent {

  clients:Client[] = [];

  constructor(private service: CustomersService,
    private router: Router ){ }

  ngOnInit():void{
    this.service
    .getListClient()
    .subscribe(response =>
      this.clients = response );
  }

  newRegister(){
    this.router.navigate(['./client-forms']);
  }
  backList(){
    this.router.navigate(['./client-list']);
  }
}
