import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from './client/client';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http :HttpClient) {

  }

  save(client:Client): Observable<Client>{
    return this.http.post<Client>('http://localhost:8090/api/client',client);
  }

  atualizar(client:Client): Observable<any>{
    return this.http.put<Client>(` http://localhost:8090/api/client/${client.id}`,client);
  }

  getListClient(): Observable<Client[]>{
    return this.http.get<Client[]>('http://localhost:8090/api/client');
  }

  
  getClientById(id:number): Observable<Client>{
    return this.http.get<any>(` http://localhost:8090/api/client/${id}`);
  }
}
