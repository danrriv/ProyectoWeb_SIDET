import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Category } from 'src/app/clases/category/category';
import { MenuData } from 'src/app/clases/menuData/menu-data';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoriesService {

  private baseUrl = 'http://localhost:8090/mundo-literario';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.baseUrl+"/category/list").pipe(
      map(response=> response as Category[])
    );
  }

  createCategory(category: Category): Observable<Category> {
      return this.http.post<Category>(this.baseUrl + "/category/create", category, { headers: this.httpHeaders });
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/category/update/${category.category_id}`, category, { headers: this.httpHeaders });
  }

  findCategoryId(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/category/findId/${id}`);
  }

  findCategory(name: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/category/findCategory/${name}`);
  }

  menu(): Observable<MenuData[]>{
    return this.http.get<MenuData[]>(this.baseUrl + "/category/menu").pipe(
      tap(data => console.log('Datos del menú:', data)),
      catchError(error => {
        console.error('Error al obtener datos del menú:', error);
        return throwError(error);
      })
    );

  }

}
