import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username:string;
  password:string;
  loginError:boolean;
  signing_up: boolean


  constructor(private router:Router){}

  onSubmit(){
    this.router.navigate(['/home'])
  }
  prepareRegister(event:any){
    event.preventDefault();
    this.signing_up = true
  }
  cancelRegistration(){
    this.signing_up = false
  }


}
