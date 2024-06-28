import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Author } from 'src/app/clases/author/author';


@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private httpClient: HttpClient) { }
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  baseUrl: string = 'http://localhost:8090/mundo-literario/author/';

  listAuthor(): Observable<Author[]>{
    return this.httpClient.get<Author[]>(this.baseUrl+"list").pipe(
      map(response => response as Author[])
    )
  }

  saveAuthor(author:Author):Observable<Author>{
    return this.httpClient.post<Author>(`${this.baseUrl}save`, author,{ headers: this.httpHeaders });
  }

  updateAuthor(author:Author): Observable<Author> {
    return this.httpClient.put<Author>(`${this.baseUrl}edit/${author.author_id}`, author, { headers: this.httpHeaders });
  }

  findAuthorId(id:number):Observable<Author>{
    return this.httpClient.get<Author>(`${this.baseUrl}findId/${id}`);
  }
}
