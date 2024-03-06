import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from './login/user';
import { Observable } from 'rxjs';
import { JwtHelperService} from '@auth0/angular-jwt'; 

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  apiURL:String = environment.apiUrl +"/api/auth";
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http:HttpClient) { 

  }

  encerrarSession(){
    localStorage.removeItem('token')
  }

  getUserAuthentication(){
    const token = this.obterToken();
    if(token){
      const  user = this.jwtHelper.decodeToken(token).user_name
      return user;
    }
  }
  obterToken(){
    const tokenString = localStorage.getItem('token');
    if(tokenString){
      const token = JSON.stringify(tokenString)
      return token;
    }
    return false; 
  }

  isAuthenticated():boolean{
    const token = localStorage.getItem('token')
    if(token){
      const expired = this.jwtHelper.isTokenExpired(token)
      return !expired; 
    }
    return false;
  }
  registerUser(user:User):Observable<any>{
    return this.http.post<any>(`${this.apiURL}/register`,user)
  }

  login(user:User):Observable<any>{
    return this.http.post<any>(`${this.apiURL}/login`,user);
  }
}
