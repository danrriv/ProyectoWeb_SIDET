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
       // Verificar si la ruta no requiere autenticación
    if (route.data && route.data['requiresLogin'] === false) {
      return true;
    }

    // Verificar si el usuario administrador está autenticado y quiere acceder a rutas de admin
    if (this.userService.isAuthenticated() && state.url.includes('/admin')) {
      return true;
    } 

    // Verificar si el cliente está autenticado y quiere acceder a rutas de perfil
    if (this.customerService.isAuthenticated() && state.url.includes('/perfil')) {
      return true;
    }

    // Redirigir al formulario de inicio de sesión correspondiente
    if (state.url.includes('/admin/')) {
      this.router.navigate(['/mundo-literario/admin/login']);
    } else if (state.url.includes('/perfil/')) {
      this.router.navigate(['/mundo-literario/login']);
    } else {
      // Redirigir al login 
      this.router.navigate(['/mundo-literario/login']);
    }

    return false;
  }
  
}
