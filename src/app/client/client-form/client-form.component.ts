import { Component } from '@angular/core';
import { Client} from '../client';
import { CustomersService } from 'src/app/customers.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent {
  client: Client;
  nome:String
  success:boolean = false
  errors:String[];
  

  constructor(private service:CustomersService){
    this.client = new Client();
  }

  onSubmit(){
    this.service
    .save(this.client)
    .subscribe(response => {
      this.success = true;
      this.errors = [];
      this.client = response
    },errorResponse =>{
      this.success = false;
      this.errors = errorResponse.error.errors
    })
  }

}
