import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  categoryForm: FormGroup;
  isNewCategory: boolean = true;
  categoryId: number;

  constructor(
    private categoryService: ApiCategoriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCategory();
  }

  initForm(): void {
    this.categoryForm = this.formBuilder.group({
      category_name: ['', Validators.required]
    });
  }

  loadCategory(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];

      if (id) {
        this.isNewCategory = false;
        this.categoryId = id;
        this.categoryService.findCategoryId(id).subscribe(
          (data) => {
            this.categoryForm.patchValue({
              category_name: data.category_name
            });
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  public saveCategory(): void {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;
      const category: Category = {
        category_id: this.categoryId,
        category_name: categoryData.category_name
      };

      if (this.isNewCategory) {
        this.categoryService.createCategory(category).subscribe(
          () => {
            this.router.navigate(['/mundo-literario/admin/mantenimiento-categorias']);
            Swal.fire('Éxito!', 'Categoría creada correctamente', 'success');
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        this.categoryService.updateCategory(category).subscribe(
          () => {
            this.router.navigate(['/mundo-literario/admin/mantenimiento-categorias']);
            Swal.fire('Éxito!', 'Categoría actualizada correctamente', 'success');
          },
          (error) => {
            console.error(error);
          }
        );
      }
    } 
  }
}