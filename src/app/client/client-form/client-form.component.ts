import { Component } from '@angular/core';
import { Client} from '../client';
import { CustomersService } from 'src/app/customers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


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
  id:number;

  constructor(
    private service:CustomersService,
    private router:Router,
    private activatedRoute: ActivatedRoute){ 
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

  backList(){
    this.router.navigate(['./client-list']);
  }
}
