import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/clases/customer/customer';
import { Login } from 'src/app/clases/login/login';

@Injectable({
  providedIn: 'root'
})
export class ApiCustomersService {

  private baseUrl = 'http://localhost:8090/mundo-literario';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  login(loginData: Login): Observable<string> {
    return this.http.post(`${this.baseUrl}/login`, loginData, { responseType: 'text' });
  }

  register(customerData: Customer): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, customerData);
  }

  updateCustomer(customerId: number, customerData: Customer): Observable<any> {
    return this.http.put(`${this.baseUrl}/auth/customer/update/${customerId}`, customerData, { headers: this.httpHeaders });
  }

  deleteCustomer(customerId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/auth/customer/eliminar/${customerId}`, { headers: this.httpHeaders });
  }

  getCustomer(customerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/customer/buscar/${customerId}`);
  }

  getCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/customer/list`);
  }

  confirmAccount(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/confirm/${token}`);
  }

  sendResetCode(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendResetCode`, email, { headers: this.httpHeaders });
  }

  resetPassword(resetCode: string, newPassword: string, email: string): Observable<any> {
    const requestData = { resetCode, newPassword, email };
    return this.http.post(`${this.baseUrl}/resetPassword`, requestData, { headers: this.httpHeaders });
  }

  //Métodos para Login y Deslogueo
  obtainLoginData(customerEmail: String):Observable<any>{
    return this.http.get(`${this.baseUrl}/customer/nameId/${customerEmail}`);
  }

  logout(){
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('logged')
  }


}
