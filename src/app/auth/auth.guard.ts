import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiUsersService } from '../services/api-users/api-users.service';
import { ApiCustomersService } from '../services/api-customers/api-customers.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: ApiUsersService,
    private customerService: ApiCustomersService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (route.data && route.data['requiresLogin'] === false) {
        return true;
      }

  // Verificar si el usuario administrador está autenticado
    if(this.userService.isAuthenticated() && state.url.includes('/admin')){
      //permite el acceso a rutas admin
      return true;
    } else if(this.customerService.isAuthenticated() && state.url.includes('/account')){
      //permite el acceso a rutas account
      return true;
    }

    // Redirigir al formulario de inicio de sesión correspondiente
    if (state.url.includes('/admin/')) {
      this.router.navigate(['/mundo-literario/admin/login']);
    } else if (state.url.includes('/account/')) {
      this.router.navigate(['/mundo-literario/login']);
    } 

    return false;
  }
  
}
