import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { Login } from 'src/app/clases/login/login';
import { Role } from 'src/app/clases/role/role';
import { User } from 'src/app/clases/user/user';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {

  private baseUrl = 'http://localhost:8090/mundo-literario';

  private  userlogged : boolean = false;

  constructor(private http: HttpClient, private router:Router) {
    this.userlogged = !!localStorage.getItem('token'); //verifica si existe un token
   }

  login(loginData: Login): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/login`, loginData)
      .pipe(
        tap((response: any) => {
          // Verifica que la respuesta contenga el token y otros datos del usuario
          if (response && response.token && response.names && response.surnames && response.role) {
            localStorage.setItem('token', response.token); // Guarda el token en el localStorage
            localStorage.setItem('names', response.names); // Guarda el nombre en el localStorage
            localStorage.setItem('surnames', response.surnames); // Guarda el apellido en el localStorage
            localStorage.setItem('role', response.role); // Guarda el rol en el localStorage
            this.userlogged = true;	
          }
        })
      );
  }

  isAuthenticated():boolean {
    return this.userlogged;
  }

  logoutUser(token: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/logout/${token}`, {});
  }

  logout(): void {
    const tokenKey = localStorage.getItem('token');
    if (tokenKey) {
      this.logoutUser(tokenKey).subscribe(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('names');
        localStorage.removeItem('surnames');
        localStorage.removeItem('role');
        this.userlogged = false;
        setTimeout(() => {
          this.router.navigate(['/mundo-literario/admin/login']);
        }, 800);
      });
    } 
  }
  
  createUser(userData: User, roleId: number): Observable<User> {
    return this.findRoleId(roleId).pipe(
      switchMap((role: Role) => {
        userData.role = role; // Asignar rol
        return this.http.post<User>(`${this.baseUrl}/user/create`, userData, { headers: this.getHeaders() });
      })
    );
  }; 
  
  updateUser(userData: User, roleId: number): Observable<User> {
    return this.findRoleId(roleId).pipe(
        switchMap( (role: Role) =>{
          userData.role = role; //asignar rol
        return this.http.put<User>(`${this.baseUrl}/user/update/${userData.user_id}`, userData, { headers: this.getHeaders() });
      })
    );
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/list`, { headers: this.getHeaders() });
  }

  findUserbyId(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/findId/${userId}`, { headers: this.getHeaders() });
  }
  
  findUserbySurnames(surnames: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/findSurnames/${surnames}`, { headers: this.getHeaders() });
  }

  getRoles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/role/listRoles`);
  }

  findRoleId(roleId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/role/findRoleId/${roleId}`);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Incluir el token en el encabezado de autorización si está disponible
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json' // Si no hay token disponible, solo incluir el encabezado Content-Type
      });
    }
  }

}
