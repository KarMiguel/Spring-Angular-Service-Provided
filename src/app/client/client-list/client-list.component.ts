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
  clientSelection: Client;
  messageSuccess: String;
  messageError:string;

  constructor(private service: CustomersService,
    private router: Router ){ }

  ngOnInit():void{
    this.service
    .getListClient()
    .subscribe(response =>
      this.clients = response );
  }
  
  formatarCPF(cpf: string): string {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
  
    // Aplica a formatação
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  
    return cpf;
  }
  preparesDeletion(client:Client){
    this.clientSelection = client
  }
  deleteClient(){
    this.service.deletById(this.clientSelection)
    .subscribe(response => {this.messageSuccess='Cliete Deletado com Sucesso!',
      this.ngOnInit();
    },
    erro => this.messageError = 'Ocorreu erro ao deletar o Client.!'
    )
  }

}
