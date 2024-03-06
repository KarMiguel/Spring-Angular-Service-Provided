import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  userLogado: string ;

  constructor(private authService: AuthService,private router:Router){
    this.ngOnInit();
  }

  ngOnInit():void{
    this.userLogado = this.authService.getUserAuthentication();
  }

  logout(){
    this.authService.encerrarSession();
    this.router.navigate(['/login'])
  }


}
