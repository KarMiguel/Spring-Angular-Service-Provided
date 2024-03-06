import { Component, OnInit } from '@angular/core';
import { ServiceProvidedSearch } from './serviceProvidedSearch';
import { ServicePrestadoService } from 'src/app/service-prestado.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-servic-provide-list',
  templateUrl: './servic-provide-list.component.html',
  styleUrls: ['./servic-provide-list.component.css']
})
export class ServicProvideListComponent implements OnInit {

  name:string;
  month: number;
  months: number[];
  list: ServiceProvidedSearch[];
  message: string | null;

  constructor(private service: ServicePrestadoService ){
    this.months =[1,2,3,4,5,6,7,8,9,10,11,12]
  }

  search(){
    if(this.month == null && this.name == null){
      this.message = "Selecione um nome/mês.";
    }
    else if(this.month == 0){
      this.message = "Selecione um mês.";
      this.list=[];
    }else if(this.month > 0){ 
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
  ngOnInit(): void {

  }

}
