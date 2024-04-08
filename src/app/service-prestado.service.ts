import { HttpClient, HttpParams } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { ServiceProvided } from './service-provided/serviceProvided';
import { Observable } from 'rxjs';
import { ServiceProvidedSearch } from './service-provided/servic-provide-list/serviceProvidedSearch';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServicePrestadoService {

   constructor(private http: HttpClient) { }

  apiUrl : string = environment.apiUrl

  saveServiceProvided(service: ServiceProvided):Observable<ServiceProvided>{
    return this.http.post<ServiceProvided>(`${this.apiUrl}/api/service-provided`,service);

  }

  deleteServiceProvided(service: ServiceProvidedSearch):Observable<ServiceProvided>{
    return this.http.delete<ServiceProvided>(`${this.apiUrl}/api/service-provided/${service.id}`,);

  }
  search(name: string, month: number): Observable<ServiceProvidedSearch[]> {
    const httpParams = new HttpParams()  
        .set("name", name? name : '')
        .set("month", month? month.toString() : '');


    return this.http.get<any>(`${this.apiUrl}/api/service-provided`, { params: httpParams });
}
}
