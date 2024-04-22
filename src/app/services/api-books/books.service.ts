import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Book } from 'src/app/clases/book';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Subgenre } from 'src/app/clases/subgenre';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private httpClient: HttpClient) { }
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})


  baseUrl: string = 'http://localhost:8080/crisol/libro/';

  private urlSubgenre:string ='http://localhost:8080/crisol/subgenero/';

  listBook(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.baseUrl}list`).pipe(
      map(response => response as Book[])
    );
  }

  saveBook(book: Book, subgenre_id: number): Observable<Book> {
  return this.searchSubgenre(subgenre_id).pipe(
    switchMap((subgenre: Subgenre) => {
          book.subgenre = subgenre;
          return this.httpClient.post<Book>(`${this.baseUrl}save`, book, {headers: this.httpHeaders});
      })
  );
}

  updateBook(book:Book, subgenre_id: number):Observable<Book>{
    return this.searchSubgenre(subgenre_id).pipe(
      switchMap((subgenre: Subgenre) => {
          book.subgenre = subgenre;
          return this.httpClient.put<Book>(`${this.baseUrl}edit/${book.book_id}`,book,{headers:this.httpHeaders});
      })
  );
  }

  searchBook(book_id:number):Observable<Book>{
    return this.httpClient.get<Book>(`${this.baseUrl}search/${book_id}`);
  }


  /*
   searchForEditorial(name: string): Observable<Book[]> {
    const url = `${this.baseUrl}buscarNombreAutorEditorial/${name}`;
    return this.httpClient.get<Book[]>(url);
  }

  searchBookForSubgen(subgenre: string): Observable<Book[]> {
    const url = `${this.baseUrl}buscarLibroporSubgenero/${subgenre}`;
    return this.httpClient.get<Book[]>(url);
  }*/

  searchSubgenre(subgenre_id: number): Observable<Subgenre> {
    return this.httpClient.get<Subgenre>(`${this.urlSubgenre}search/${subgenre_id}`);
  }
}
