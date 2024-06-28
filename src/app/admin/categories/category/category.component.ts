import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/clases/category/category';
import { ApiCategoriesService } from 'src/app/services/api-categories/api-categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  categories: Category[] = [];
  searchInput:string = '';
  dataSource: MatTableDataSource<Category>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private categoryService: ApiCategoriesService){}

  ngOnInit(): void{
   this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((data) =>{
      this.categories = data;
      this.dataSource = new MatTableDataSource<Category>(this.categories);
        this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchInput.trim().toLowerCase(); // Aplica el filtro
  }

}