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
}
