import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Genre } from 'src/app/clases/genre/genre';
import { Genresubgenre } from 'src/app/clases/genresubgenre/genresubgenre';
import { Subgenre } from 'src/app/clases/subgenre/subgenre';

@Injectable({
  providedIn: 'root'
})
export class ApiGensubService {

  private baseUrl = 'http://localhost:8090/mundo-literario';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getGenresSubgenres():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+"/gensubgenre/list").pipe(
      map(response => {
        return response.map(item =>{
          return {
            genre : item[0],
            subgenre: item[1]
          };
        });
      })
    );
  }

  createGenreSubgenre(genresub: Genresubgenre, genre_id:number, subgenre_id:number): Observable<Genresubgenre>{
    return this.findGenreId(genre_id).pipe(
      switchMap(genre => {
        genresub.genre = genre;
        return this.findSubgenreId(subgenre_id).pipe(
          switchMap(subgenre => {
            genresub.subgenre = subgenre;
            return this.http.post<Genresubgenre>(this.baseUrl + "/gensubgenre/create", genresub, { headers: this.httpHeaders });
          })
        );
      })
    );
  }

  findGenreId(id: number): Observable<Genre>{
    return this.http.get<Genre>(`${this.baseUrl}/genre/findId/${id}`);
  }

  findSubgenreId(id: number): Observable<Subgenre> {
    return this.http.get<Subgenre>(`${this.baseUrl}/subgenre/findId/${id}`);
  }

  getGenre():Observable<Genre[]>{
    return this.http.get<Genre[]>(this.baseUrl+"/genre/list").pipe(
      map(response=> response as Genre[])
    );
  }

  getSubgenre():Observable<Subgenre[]>{
    return this.http.get<Subgenre[]>(this.baseUrl+"/subgenre/list").pipe(
      map(response=> response as Subgenre[])
    );
  }

  findUnassignedSubgenresByGenreId(genre_id: number): Observable<Subgenre[]> {
    return this.http.get<Subgenre[]>(`${this.baseUrl}/gensubgenre/findUnassignedSubgenresByGenreId/${genre_id}`);
  }
}
