import { Component ,OnInit} from '@angular/core';
import { Client } from 'src/app/client/client';
import { CustomersService } from 'src/app/customers.service';
import { ServiceProvided } from '../serviceProvided';
import { ServicePrestadoService } from 'src/app/service-prestado.service';
@Component({
  selector: 'app-servic-provide-form',
  templateUrl: './servic-provide-form.component.html',
  styleUrls: ['./servic-provide-form.component.css']
})
export class ServicProvideFormComponent implements OnInit{

  customers : Client[] = [];
  service: ServiceProvided;
  success:boolean = false;
  errors:String[]=[];
  
  

  constructor(private clientService: CustomersService,
    private serviceProvided:ServicePrestadoService){
    this.service = new ServiceProvided();
  }

  ngOnInit():void{
    this.clientService
    .getListClient()
    .subscribe( response => this.customers  = response);
  }

  onSubmit():void{
    this.serviceProvided
        .saveServiceProvided(this.service)
        .subscribe(response => {
          this.success = true;
          this.errors = [];
          response.idClient 
          this.service = new ServiceProvided();
        },errorResponse =>{
          this.success = false;
          this.errors = errorResponse.error.errors
        })

  }


}
