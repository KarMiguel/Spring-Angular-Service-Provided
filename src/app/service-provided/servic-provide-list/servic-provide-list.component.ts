import { Component, OnInit } from '@angular/core';
import { ServiceProvidedSearch } from './serviceProvidedSearch';
import { ServicePrestadoService } from 'src/app/service-prestado.service';
import { Subscriber } from 'rxjs';
declare var $: any;


@Component({
  selector: 'app-servic-provide-list',
  templateUrl: './servic-provide-list.component.html',
  styleUrls: ['./servic-provide-list.component.css']
})
export class ServicProvideListComponent  {

  name:string;
  month: number;
  months: number[];
  list: ServiceProvidedSearch[];
  message: string | null;
  serviceProvided:ServiceProvidedSearch
  messageSuccess:string
  messageError:string

  constructor(private service: ServicePrestadoService ){
    this.months =[1,2,3,4,5,6,7,8,9,10,11,12]
  }

  preparesDelete(servico: ServiceProvidedSearch){
    this.serviceProvided = servico
    $('#modalDelet').modal('show'); 
  }

  deleteService(){
    this.service.deleteServiceProvided(this.serviceProvided)
    .subscribe(response => {
      this.messageSuccess='Cliente Deletado com Sucesso!',
      window.location.reload()
    },
    erro => this.messageError = 'Ocorreu erro ao deletar o Cliente .'
    )

  }

  formatarPrice(price: string): string {
    price = price.replace(/\D/g, '');

    const numericPrice = parseFloat(price);
  
    const formattedPrice = numericPrice.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  
    return formattedPrice;
  }
  search(){

   if(this.month == null && this.name == null){
      this.message = "Selecione um nome/mês.";
    }else{ 
    this.service
    .search(this.name,this.month)
    .subscribe(response =>{ 
      this.list = response;
        if(this.list.length <= 0){
          this.message = "Nenhum Registro Encontrado.";
        }else{
           this.message = null;
          }
      });
    }
  }
 

}
