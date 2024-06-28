import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/clases/sales/mercadoPago';

@Injectable({
  providedIn: 'root'
})
export class PrefenceService {

  key:string = `Bearer `+ environment.KEY

  constructor(private httpClient: HttpClient) { }
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 
  "Authorization": this.key });

  baseUrl: string = 'https://api.mercadopago.com/checkout/preferences'

  createPrefence(items:any){
    return this.httpClient.post(this.baseUrl, {
      items,
      back_urls: {
        success: "http://localhost:4200/mundo-literario",
        failure: "http://localhost:4200/mundo-literario",
        pending: "http://localhost:4200/mundo-literario"
      },
      auto_return: "approved", 
  },{headers:this.httpHeaders});
  }

}
