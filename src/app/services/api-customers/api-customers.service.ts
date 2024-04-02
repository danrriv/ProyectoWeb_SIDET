import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/clases/customer';
import { Login } from 'src/app/clases/login';

@Injectable({
  providedIn: 'root'
})
export class ApiCustomersService {

  private baseUrl = 'http://localhost:8090/mundo-literario/customer';
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
}
