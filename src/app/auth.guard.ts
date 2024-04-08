import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn =  (
    route:ActivatedRouteSnapshot, 
    state : RouterStateSnapshot
    ) => {

    const authService = inject(AuthService); 
    const router = inject(Router);     

    const storedId = sessionStorage.getItem('lockedId');
    const routeId = route.paramMap.get('id');
 

      if(storedId && routeId && storedId === routeId || authService.isAuthenticated()){
        return true;
      }else{
        router.navigate(['./login'])
        return false;
      }

  };

  