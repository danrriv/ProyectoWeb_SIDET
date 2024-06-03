import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { SaleL } from 'src/app/clases/sales/sale/sale-l';
import { SaleDetailsL } from 'src/app/clases/sales/saleDetails/sale-details-l';
import { SaleDto } from 'src/app/clases/sales/saleDto/sale-dto';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private baseUrl: string ='http://localhost:8090/mundo-literario/sale/'

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})


  constructor(private httpClient: HttpClient) { }


  registerSale(dto:SaleDto): Observable<SaleDto>{
    return this.httpClient.post<SaleDto>(`${this.baseUrl}save`,dto,{withCredentials: true})
  }

  findSaleCustomer(id:number): Observable<SaleL[]>{
    return this.httpClient.get<SaleL[]>(`${this.baseUrl}customer/${id}`).pipe(
      map(response => response as SaleL[])
    );
  }

  findDetails(id:number): Observable<SaleDetailsL[]>{
    return this.httpClient.get<SaleDetailsL[]>(`${this.baseUrl}details/${id}`).pipe(
      map(response => response as SaleDetailsL[])
    );
  }

  findSale(id:number): Observable<SaleL>{
    return this.httpClient.get<SaleL>(`${this.baseUrl}find/${id}`);
  }

  listAllSales(): Observable<SaleL[]> {
    return this.httpClient.get<SaleL[]>(`${this.baseUrl}list`).pipe(
      map(response => response as SaleL[])
    );
  }

  listPending(): Observable<SaleL[]> {
    return this.httpClient.get<SaleL[]>(`${this.baseUrl}listPending`).pipe(
      map(response => response as SaleL[])
    );
  }
  
  confirmarVenta(id:number):Observable<SaleL>{
    return this.httpClient.put<SaleL>(`${this.baseUrl}confirm/${id}`,{ headers: this.httpHeaders });

  }
}
