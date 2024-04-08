import { Component,OnInit } from '@angular/core';
import { Client } from '../client';
import { CustomersService } from 'src/app/customers.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent {

  clients:Client[] = [];
  clientSelection: Client;
  messageSuccess: String;
  messageError:string;
  clienteUpdate: Client;
  success:boolean | undefined
  errors:String[];
  id:number;

  constructor(private service: CustomersService,
    private router: Router ,
    private activatedRoute: ActivatedRoute,
  ){ }


    ngOnInit():void{
    this.service
    .getListClient()
    .subscribe(response =>
      this.clients = response );
  }
  
  formatarCPF(cpf: string): string {
    cpf = cpf.replace(/\D/g, '');
  
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  
    return cpf;
  }

  formatarPhone(phone: string): string {
    phone = phone.replace(/\D/g, '');
  
    phone = phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2 - $3');
  
    return phone;
  }
  preparesDeletion(client:Client){
    this.clientSelection = client
    $('#modalDelet').modal('show'); 

  }
  preparesUpdate(client:Client){
    this.clienteUpdate = client
    $('#modalUpdate').modal('show'); 
  }
  deleteClient(){
    this.service.deletById(this.clientSelection)
    .subscribe(response => {this.messageSuccess='Cliente Deletado com Sucesso!',
      this.ngOnInit();
    },
    erro => this.messageError = 'Ocorreu erro ao deletar o Cliente .'
    )
  }

  updateClient() {
    this.success = undefined;


    if (this.clienteUpdate) {
      this.service.atualizar(this.clienteUpdate).subscribe(
        response => { 
          this.success = true;
          console.log("modal1 = ", this.success);
          this.clienteUpdate = response.data;
          this.service.getListClient()

        }, 
        errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
          console.log("Errors: ", this.errors);
        }
      );
    
  };
}

}