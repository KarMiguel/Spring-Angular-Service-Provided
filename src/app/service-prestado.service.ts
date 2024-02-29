import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { ServiceProvided } from './service-provided/serviceProvided';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicePrestadoService {

   constructor(private http: HttpClient) { }

  saveServiceProvided(service: ServiceProvided):Observable<ServiceProvided>{
    return this.http.post<ServiceProvided>('http://localhost:8090/api/service-provided',service);

  }
}
