import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/clases/category/category';
import { ApiCategoriesService } from 'src/app/services/api-categories/api-categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit{

  public category: Category = new Category();
  errorStatus: boolean = false;
  errorMsj: any = "";

  constructor(
    private categoryService: ApiCategoriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
      this.loadCategory();
  }

  loadCategory(): void{
    this.activatedRoute.params.subscribe((params) =>{
      const id = +params['id'];

      if(id){
        this.categoryService.findCategoryId(id).subscribe(
          (data) => {
            this.category = data;
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  validarCampos(): boolean {
    if (!this.category.category_name) return false;
    return true;
  }

  public createCategory(): void {
    if(this.validarCampos()) {
      this.categoryService.createCategory(this.category)
      .subscribe(
        (category) => {
          this.router.navigate(['/mundo-literario/admin/mantenimiento-categorias']);
          Swal.fire(
            'Éxito!',
            'Categoría creada correctamente',
            'success'
          )
        },
        (error) => {
          console.error(error);
        }
      );
    }
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Complete todos los campos.'
    });
  }

  public updateCategory(): void {
    if(this.validarCampos()) {
      console.log("id categoria:" + this.category.category_id)
    this.categoryService.updateCategory(this.category)
      .subscribe(
        (category) => {
          this.router.navigate(['/mundo-literario/admin/mantenimiento-categorias']);
          Swal.fire(
            'Éxito!',
            'Categoría actualizada correctamente',
            'success'
          )
        },
        (error) => {
          console.error(error);
        }
      );
    }
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Complete todos los campos.'
    });
  }
}
