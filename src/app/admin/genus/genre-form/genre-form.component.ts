import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/clases/category/category';
import { Genre } from 'src/app/clases/genre/genre';
import { ApiGenreService } from 'src/app/services/api-genre/api-genre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genre-form',
  templateUrl: './genre-form.component.html',
  styleUrls: ['./genre-form.component.css']
})
export class GenreFormComponent implements OnInit {
  public genre : Genre = new Genre();
  categories: Category[] =[];
  selectedCategory:number | number=0;
  errorStatus: boolean = false;
  errorMsj: any = "";

  constructor(
    private genreService: ApiGenreService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadGenre();
    this.listCategories();
}

  listCategories(): void {
    this.genreService.getCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadGenre():void{
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];

      if (id) {
        this.genreService.findGenreId(id).subscribe(
          (data) => {
            this.genre = data;
            this.selectedCategory = this.genre.category?.category_id || 0; 
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  validarCampos(): boolean {
    if (!this.genre.category && !this.genre.genre_name) return false;
    return true;
  }

  public createGenre(): void {

    if(this.validarCampos()) {
      this.genreService
        .createGenre(this.genre, this.selectedCategory)
        .subscribe(
          (genre) => {
            this.router.navigate(['/mundo-literario/admin/mantenimiento-generos']);
            Swal.fire(
              'Éxito!',
              'Género creado correctamente',
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

  public updateGenre(): void {
    if(this.validarCampos()) {
    this.genreService
      .updateGenre(this.genre, this.selectedCategory)
      .subscribe(
        (genre) => {
          this.router.navigate(['/mundo-literario/admin/mantenimiento-generos']);
          Swal.fire(
            'Éxito!',
            'Género creado correctamente',
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
