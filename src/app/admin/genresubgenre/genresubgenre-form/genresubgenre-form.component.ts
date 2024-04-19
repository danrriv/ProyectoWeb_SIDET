import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  genre: Genre[]=[];
  subgenre: Subgenre[]=[];
  selectedGenre : number | number=0;
  selectedSubgenre : number | number=0;
  public gensubgenre : Genresubgenre = new Genresubgenre();

  constructor(
    private gensubService: ApiGensubService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loaadGenres();
    this.loaadSubgenres();
  }

  loaadGenres(): void {
    this.gensubService.getGenre().subscribe(
      (response: Genre[]) => {
        this.genre = response;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  loaadSubgenres(): void {
    this.gensubService.getSubgenre().subscribe(
      (response: Subgenre[]) => {
        this.subgenre = response;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  loadSubgenresByGenreId(genreId: number): void {
    this.gensubService.findUnassignedSubgenresByGenreId(genreId).subscribe(
      (response: Subgenre[]) => {
        this.subgenre = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onGenreSelected(): void {
    if (this.selectedGenre && this.selectedGenre !== 0) {
      this.loadSubgenresByGenreId(this.selectedGenre);
    }
  
  }

  validSelected(): boolean {
    if (!this.selectedGenre || this.selectedGenre === 0) return false;
    if (!this.selectedSubgenre || this.selectedSubgenre === 0) return false;
    return true;
  }

  public createGenreSubgenre():void {
    if(this.validSelected()){
      this.gensubService.createGenreSubgenre(this.gensubgenre, this.selectedGenre, this.selectedSubgenre)
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
    else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Datos incompletos'
      })
    }
  }

}
