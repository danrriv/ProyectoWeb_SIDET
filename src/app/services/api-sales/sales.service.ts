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

  private baseUrl: string ='http://localhost:8090/mundoliterario/sale/'

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})


  constructor(private httpClient: HttpClient) { }


  registerSale(dto:SaleDto): Observable<SaleDto>{
    return this.httpClient.post<SaleDto>(`${this.baseUrl}save`,dto,{headers:this.httpHeaders})

  }

  findSaleCustomer(id:number): Observable<SaleL[]>{
    return this.httpClient.get<SaleL[]>(`${this.baseUrl}clientes/${id}`).pipe(
      map(response => response as SaleL[])
    );
  }

  buscarDetalles(id:number): Observable<SaleDetailsL[]>{
    return this.httpClient.get<SaleDetailsL[]>(`${this.baseUrl}detalles/${id}`).pipe(
      map(response => response as SaleDetailsL[])
    );
  }

  buscarVenta(id:number): Observable<SaleL>{
    return this.httpClient.get<SaleL>(`${this.baseUrl}buscar/${id}`);
  }

  obtenerVentas(): Observable<SaleL[]> {
    return this.httpClient.get<SaleL[]>(`${this.baseUrl}listar`).pipe(
      map(response => response as SaleL[])
    );
  }

  obtenerVentasPendientesDomicilio(): Observable<SaleL[]> {
    return this.httpClient.get<SaleL[]>(`${this.baseUrl}listarpendientes`).pipe(
      map(response => response as SaleL[])
    );
  }

  obtenerVentasConfirmar(): Observable<SaleL[]> {
    return this.httpClient.get<SaleL[]>(`${this.baseUrl}listarconfirmar`).pipe(
      map(response => response as SaleL[])
    );
  }
  
  confirmarVenta(saleId:number):Observable<SaleL>{
    return this.httpClient.put<SaleL>(`${this.baseUrl}confirmar/${saleId}`,{ headers: this.httpHeaders });

  }

}
