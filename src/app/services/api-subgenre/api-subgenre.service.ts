import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Subgenre } from 'src/app/clases/subgenre/subgenre';

@Injectable({
  providedIn: 'root'
})
export class ApiSubgenreService {

  private baseUrl = 'http://localhost:8090/mundo-literario';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getSubgenre():Observable<Subgenre[]>{
    return this.http.get<Subgenre[]>(this.baseUrl+"/subgenre/list").pipe(
      map(response=> response as Subgenre[])
    );
  }

  createSubgenre(subgenre: Subgenre): Observable<Subgenre> {
      return this.http.post<Subgenre>(this.baseUrl + "/subgenre/create", subgenre, { headers: this.httpHeaders });
  }

  updateSubgenre(subgenre: Subgenre): Observable<Subgenre> {
    return this.http.put<Subgenre>(`${this.baseUrl}/subgenre/update/${subgenre.subgenre_id}`, subgenre, { headers: this.httpHeaders });
  }

  findSubgenreId(id: number): Observable<Subgenre> {
    return this.http.get<Subgenre>(`${this.baseUrl}/subgenre/findId/${id}`);
  }

  findSubgenre(name: string): Observable<Subgenre[]> {
    return this.http.get<Subgenre[]>(`${this.baseUrl}/subgenre/findSubgenre/${name}`);
  }

}
