import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Book } from 'src/app/clases/book/book';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Subgenre } from 'src/app/clases/subgenre/subgenre';
import { Author } from 'src/app/clases/author/author';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private httpClient: HttpClient) { }
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })


  baseUrl: string = 'http://localhost:8090/mundo-literario/book';

  private urlSubgenre: string = 'http://localhost:8090/mundo-literario/subgenre/';

  private urlAuthor: string = 'http://localhost:8090/mundo-literario/author/';


  //Listados generales
  listSubgenre(): Observable<Subgenre[]> {
    return this.httpClient.get<Subgenre[]>(this.urlSubgenre +"list").pipe(
      map(response => response as Subgenre[])
    )
  }

  listAuthor(): Observable<Author[]>{
    return this.httpClient.get<Author[]>(this.urlAuthor+"list").pipe(
      map(response => response as Author[])
    )
  }


  listBook(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.baseUrl+"/list").pipe(
      map(response => response as Book[])
    );
  }

  listRandom():Observable<Book[]>{
    return this.httpClient.get<Book[]>(this.baseUrl+"/random").pipe(
      map(response => response as Book[])
    );
  }

  //Métodos CRUD
  saveBook(book: Book, subgenre_id: number, author_id: number): Observable<Book> {
    return this.searchSubgenre(subgenre_id).pipe(
      switchMap((subgenre: Subgenre) => {
        book.subgenre = subgenre;
        return this.searchAuthor(author_id).pipe(
          switchMap((author: Author) => {
            book.author = author;
            return this.httpClient.post<Book>(`${this.baseUrl}/save`, book, { headers: this.httpHeaders });
          })
        );
      })
    );
  }

  updateBook(book: Book, subgenre_id: number, author_id: number): Observable<Book> {
    return this.searchSubgenre(subgenre_id).pipe(
      switchMap((subgenre: Subgenre) => {
        book.subgenre = subgenre;
        return this.searchAuthor(author_id).pipe(
          switchMap((author: Author) => {
            book.author = author;
            return this.httpClient.put<Book>(`${this.baseUrl}/edit/${book.book_id}`, book, { headers: this.httpHeaders });
          })
        );
      })
    );
  }
  //Buscar por algún parámetro

  findIdBook(book_id: number): Observable<Book> {
    return this.httpClient.get<Book>(`${this.baseUrl}/findId/${book_id}`);
  }

  findIdBookMapper(book_id: number): Observable<Book> {
    return this.httpClient.get<Book>(`${this.baseUrl}/findIdM/${book_id}`);
  }

  findSimilarNameBook(book_name: string): Observable<Book[]>{
    return this.httpClient.get<Book[]>(this.baseUrl+"/findSimilarName/"+book_name).pipe(
      map(response => response as Book[])
    )
  }

  findNameBook(book_name: string): Observable<Book>{
    return this.httpClient.get<Book>(this.baseUrl+"/findName/"+book_name);
  }

  findGenreId(id: number): Observable<Book[]>{
    return this.httpClient.get<Book[]>(this.baseUrl+"/findGenreId/"+id).pipe(
      map(response => response as Book[])
    )
  }

  findSubgenreId(id: number): Observable<Book[]>{
    return this.httpClient.get<Book[]>(this.baseUrl+"/findSubgenreId/"+id).pipe(
      map(response => response as Book[])
    )
  }

  //Métodos útiles
  searchSubgenre(subgenre_id: number): Observable<Subgenre> {
    return this.httpClient.get<Subgenre>(`${this.urlSubgenre}findId/${subgenre_id}`);
  }

  searchAuthor(author_id: number): Observable<Author> {
    return this.httpClient.get<Author>(`${this.urlAuthor}findId/${author_id}`);
  }


}
