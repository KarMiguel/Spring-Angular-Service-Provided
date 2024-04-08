import { Component,OnInit } from '@angular/core';
import { Client } from '../client';
import { CustomersService } from 'src/app/customers.service';
import { Router, ActivatedRoute } from '@angular/router';


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
  preparesDeletion(client:Client){
    this.clientSelection = client
  }
  preparesUpdate(client:Client){
    this.clienteUpdate = client
  }
  deleteClient(){
    this.service.deletById(this.clientSelection)
    .subscribe(response => {this.messageSuccess='Cliente Deletado com Sucesso!',
      this.ngOnInit();
    },
    erro => this.messageError = 'Ocorreu erro ao deletar o Client.!'
    )
  }

  updateClient() {
    this.success = undefined;

  // Chama a função para obter os dados da API novamente
  this.service.getListClient().subscribe(response => {
    this.clients = response;

    // Em seguida, executa a lógica para atualizar o cliente
    if (this.clienteUpdate) {
      this.service.atualizar(this.clienteUpdate).subscribe(
        response => { 
          this.success = true;
          console.log("modal1 = ", this.success);
          response = this.clienteUpdate = response.data;
          
        }, 
        errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
          console.log("Errors: ", this.errors);
        }
      );
    }
  });
}

}