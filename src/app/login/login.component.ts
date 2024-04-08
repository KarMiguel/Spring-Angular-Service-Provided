import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username:string;
  password:string;
  name:string;
  signing_up: boolean
  menssageSuccess:string | null;
  errors: string[];

  constructor(private router:Router,
    private authService:AuthService){}

   

  onSubmit(){
    const user:User = new User();
    user.username = this.username;
    user.password = this.password;
      this.authService
        .login(user)
        .subscribe(
          (response) =>{
            const access_token = response.token;
            localStorage.setItem('token', access_token);
          this.router.navigate(['/home'])
        },errorResponse =>{
          this.errors = ['Usuário e/ou senha incorreto']
        })
  }
  prepareRegister(event:any){
    event.preventDefault();
    this.signing_up = true
  }
  cancelRegistration(){
    this.signing_up = false
  }
  register() {
    const user: User = new User();
    user.name = this.name;
    user.username = this.username;
    user.password = this.password;
    if (this.password.length < 8) {
      this.errors = ['Senha deve conter no mínimo 8 caracteres.'];
    } else {
      this.authService
        .registerUser(user)
        .subscribe(
          response => {
            this.menssageSuccess = "Cadastro realizado com sucesso! Efetue o login!";
            this.signing_up = false;
            this.username = '';
            this.password = '';
            this.name = '';
            this.errors = [];
          },
          errorResponse => {
            this.menssageSuccess = null;
            this.errors = errorResponse.error.errors;
          }
        );
    }
  }
  }


