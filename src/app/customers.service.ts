import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from './client/client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http :HttpClient) {

  }
  apiUrl : string = environment.apiUrl

  save(client:Client): Observable<Client>{

    return this.http.post<Client>(`${this.apiUrl}/api/client/`,client);
  }

  atualizar(client:Client): Observable<any>{
    return this.http.put<Client>(`${this.apiUrl}/api/client/${client.id}`,client);
  }

  getListClient(): Observable<Client[]>{
    
    return this.http.get<Client[]>(`${this.apiUrl}/api/client/`);
  }
  
  getClientById(id:number): Observable<Client>{
    return this.http.get<any>(`${this.apiUrl}/api/client/${id}`);
  }

  deletById(client:Client): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/api/client/${client.id}`);
  }


}
function throwError(arg0: string): Observable<Client[]> {
  throw new Error('Function not implemented.');
}

