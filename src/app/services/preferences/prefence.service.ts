import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrefenceService {

  constructor(private httpClient: HttpClient) { }
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 
  "Authorization": `Bearer TEST-4117164458675144-050521-ca2616480e9710d8beb442702197d7dc-1733011667` });

  baseUrl: string = 'https://api.mercadopago.com/checkout/preferences'

  createPrefence(items:any){
    return this.httpClient.post(this.baseUrl, {
      items,
      back_urls: {
        success: "/",
        failure: "http://test.com/success",
        pending: "http://test.com/success"
      },
      auto_return: "approved", // Array de items xd
  },{headers:this.httpHeaders});
  }

}
