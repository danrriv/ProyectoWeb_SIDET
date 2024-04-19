import { Component } from '@angular/core';
import { Genre } from 'src/app/clases/genre/genre';
import { ApiGenreService } from 'src/app/services/api-genre/api-genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent {

  genre : Genre[]=[];
  search: string = '';
  errorStatus: boolean = false;
  errorMsj: any = "";

  constructor(private genreService: ApiGenreService){}

  ngOnInit():void {
    this.getGenre();
  }

  getGenre(){
    this.genreService.getGenre().subscribe(
      (data)=>{ 
        this.genre = data
      });
  }

  findGenre(name: string): void {
    this.errorStatus = false; // Restablece el estado de error

    if (name.trim() === '') {
      this.getGenre(); // Si el campo de búsqueda está vacío, muestra todaos ls géneros
    } else {
      this.genreService.findGenre(name).subscribe(
        (data: Genre[]) => {
          if (data.length > 0) {
            this.genre = data; // Actualiza la tabla con los resultados de búsqueda
          } else {
            this.errorStatus = true;
            this.errorMsj = 'No se encontraron resultados para "' + name + '"';
          }
        },
        (error) => {
          console.error('Error al buscar el género ', name, ': ', error);
        }
      );
    }
  }

}
