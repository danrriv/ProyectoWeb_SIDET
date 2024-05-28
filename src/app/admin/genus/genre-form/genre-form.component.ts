import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  isNewGenre: boolean = true;
  selectedCategory:number | number=0;
  genreForm :FormGroup;

  constructor(
    private genreService: ApiGenreService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.loadGenre();
    this.listCategories();
    this.genreForm = this.formBuilder.group({
      genre_name : ['', Validators.required],
      selectedCategory: [null, Validators.required]
    });
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
        this.isNewGenre = false;
        this.genreService.findGenreId(id).subscribe(
          (data) => {
            this.genre.genre_id= data.genre_id;
            this.genreForm.patchValue({
              genre_name: data.genre_name,
              selectedCategory: data.category?.category_id
          });
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  
  public createGenre(): void {

    console.log(this.genreForm.value)
    if(this.genreForm.valid) {
      this.genre = Object.assign({}, this.genre, this.genreForm.value);
      
      this.genreService
        .createGenre(this.genre, this.genreForm.value.selectedCategory)
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
  }

  public updateGenre(): void {
    if(this.genreForm.valid) {
      this.genre = Object.assign({}, this.genre, this.genreForm.value);

    this.genreService
      .updateGenre(this.genre, this.genreForm.value.selectedCategory)
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
  }

  public onSubmit(): void {
    if (this.isNewGenre) {
      this.createGenre();
    } else {
      this.updateGenre();
    }
  }

}
