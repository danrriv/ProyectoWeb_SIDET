import { Component } from '@angular/core';
import { Category } from 'src/app/clases/category/category';
import { ApiCategoriesService } from 'src/app/services/api-categories/api-categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  categories: Category[] = [];
  search: string = '';
  errorStatus: boolean = false;
  errorMsj: any = "";

  constructor(private categoryService: ApiCategoriesService){}

  ngOnInit(): void{
   this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((data) =>{
      this.categories = data;
    });
  }

  findCategory(name: string): void {
    this.errorStatus = false; // Restablece el estado de error

    if (name.trim() === '') {
      this.getCategories(); // Si el campo de búsqueda está vacío, muestra todas las categorías
    } else {
      this.categoryService.findCategory(name).subscribe(
        (data: Category[]) => {
          if (data.length > 0) {
            this.categories = data; // Actualiza las categorías con los resultados de búsqueda
          } else {
            this.errorStatus = true;
            this.errorMsj = 'No se encontraron resultados para "' + name + '"';
          }
        },
        (error) => {
          console.error('Error al buscar la categoría ', name, ': ', error);
        }
      );
    }
  }

}
