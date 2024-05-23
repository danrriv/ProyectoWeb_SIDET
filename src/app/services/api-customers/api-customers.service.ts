import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Customer } from 'src/app/clases/customer/customer';
import { Login } from 'src/app/clases/login/login';

@Injectable({
  providedIn: 'root'
})
export class ApiCustomersService {

  private baseUrl = 'http://localhost:8090/mundo-literario';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private  customerlogged : boolean = false;
  private tokenkey: string = 'tokenCustomer';
  constructor(private http: HttpClient, private router:Router) { }

  login(loginData: Login): Observable<string> {
    this.customerlogged = true;
    return this.http.post(`${this.baseUrl}/customer/login`, loginData, { responseType: 'text' })
    .pipe(
      tap((tokenCustomer: string) => {
        localStorage.setItem(this.tokenkey, tokenCustomer); // Guarda el token en el localStorage
      })
    )
  }

  register(customerData: Customer): Observable<any> {
    return this.http.post(`${this.baseUrl}/customer/register`, customerData);
  }

  updateCustomer(customerId: number, customerData: Customer): Observable<any> {
    return this.http.put(`${this.baseUrl}/auth/customer/update/${customerId}`, customerData, { headers: this.httpHeaders });
  }

  getCustomer(customerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/customer/findId/${customerId}`);
  }

  getCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/customer/list`);
  }

  confirmAccount(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/customer/confirm/${token}`);
  }

  sendResetCode(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/customer/sendResetCode`, email, { headers: this.httpHeaders });
  }

  resetPassword(resetCode: string, newPassword: string, email: string): Observable<any> {
    const requestData = { resetCode, newPassword, email };
    return this.http.post(`${this.baseUrl}/customer/resetPassword`, requestData, { headers: this.httpHeaders });
  }
  
  isAuthenticated():boolean {
    return this.customerlogged;
  }

  logout(): void {
    const tokenKey = localStorage.getItem('tokenCustomer');
    if (tokenKey) {
      this.logoutCustomer(tokenKey).subscribe(() => {
        localStorage.removeItem('tokenCustomer');
        this.customerlogged = false;
    setTimeout(() => {
      this.router.navigate(['/mundo-literario']);
      
    }, 800);
      });
    }
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('logged')
  }

  logoutCustomer(token: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout/${token}`, {});
  }

  //Métodos para Login y Deslogueo
  obtainLoginData(customerEmail: String):Observable<any>{
    return this.http.get(`${this.baseUrl}/customer/nameId/${customerEmail}`);
  }
}
