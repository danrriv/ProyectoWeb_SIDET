import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from 'src/app/clases/genre/genre';
import { Genresubgenre } from 'src/app/clases/genresubgenre/genresubgenre';
import { Subgenre } from 'src/app/clases/subgenre/subgenre';
import { ApiGensubService } from 'src/app/services/api-gensub/api-gensub.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genresubgenre-form',
  templateUrl: './genresubgenre-form.component.html',
  styleUrls: ['./genresubgenre-form.component.css']
})
export class GenresubgenreFormComponent {

  genres: Genre[]=[];
  subgenres: Subgenre[]=[];
  selectedGenre : number | null = null;
  selectedSubgenre : number | null = null;
  public gensubgenre : Genresubgenre = new Genresubgenre();
  gensubgenreForm :FormGroup;


  constructor(
    private gensubService: ApiGensubService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.loaadGenres();
    this.loaadSubgenres();
    this.gensubgenreForm = this.formBuilder.group({
      selectedGenre: [null, Validators.required],
      selectedSubgenre: [ null, Validators.required]
    })
  }

  loaadGenres(): void {
    this.gensubService.getGenre().subscribe(
      (response: Genre[]) => {
        this.genres = response;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  loaadSubgenres(): void {
    this.gensubService.getSubgenre().subscribe(
      (response: Subgenre[]) => {
        this.subgenres = response;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  //lista subgéneros no asignados al género seleccionado
  loadSubgenresByGenreId(genreId: number): void {
    this.gensubService.findUnassignedSubgenresByGenreId(genreId).subscribe(
      (response: Subgenre[]) => {
        console.log(response);
        this.subgenres = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onGenreSelected(): void {
    if (this.selectedGenre !=null) {
      console.log('Género seleccionado:', this.selectedGenre);
      this.loadSubgenresByGenreId(this.selectedGenre);
    }
    console.log('Género seleccionado:', this.selectedGenre);
  }

  public createGenreSubgenre():void {
    if(this.gensubgenreForm.valid) {
     this.gensubgenre = Object.assign({}, this.gensubgenre, this.gensubgenreForm.value);
      this.gensubService
      .createGenreSubgenre(this.gensubgenre,  this.gensubgenreForm.value.selectedGenre,  this.gensubgenreForm.value.selectedSubgenre)
      .subscribe(
        (gensub) => {
          this.router.navigate(['mundo-literario/admin/mantenimiento-generos-subgeneros']);
          Swal.fire(
            'Éxito!',
            'Género - Subgénero creado correctamente',
            'success'
          )
        },
        (error) => {
          console.error(error);
        }
      );
    }
    console.log(this.gensubgenreForm.value)
  }

}
