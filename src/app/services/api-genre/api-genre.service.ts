import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Category } from 'src/app/clases/category/category';
import { Genre } from 'src/app/clases/genre/genre';

@Injectable({
  providedIn: 'root'
})
export class ApiGenreService {

  private baseUrl = 'http://localhost:8090/mundo-literario';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getGenre():Observable<Genre[]>{
    return this.http.get<Genre[]>(this.baseUrl+"/genre/list").pipe(
      map(response=> response as Genre[])
    );
  }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.baseUrl+"/category/list").pipe(
      map(response=> response as Category[])
    );
  }

  findGenreId(id: number): Observable<Genre>{
    return this.http.get<Genre>(`${this.baseUrl}/genre/findId/${id}`);
  }

  findCategoryId(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/category/findId/${id}`);
  }

  createGenre(genre: Genre, category_id: number): Observable<Genre> {
    return this.findCategoryId(category_id).pipe(
      switchMap((category : Category) =>{
        genre.category = category;
        return this.http.post<Genre>(this.baseUrl+ "/genre/create", genre,{headers: this.httpHeaders});
      })
    );
  }

  updateGenre(genre: Genre, category_id: number): Observable<Genre> {
    return this.findCategoryId(category_id).pipe(
      switchMap((category : Category) =>{
        genre.category = category;
        return this.http.put<Genre>(`${this.baseUrl}/genre/update/${genre.genre_id}`, genre, { headers: this.httpHeaders });
      })
    );
  }

  findGenre(name: string): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.baseUrl}/genre/findGenre/${name}`);
  }
}
