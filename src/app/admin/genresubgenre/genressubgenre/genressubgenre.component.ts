import { Component } from '@angular/core';
import { Genresubgenre } from 'src/app/clases/genresubgenre/genresubgenre';
import { ApiGenreService } from 'src/app/services/api-genre/api-genre.service';
import { ApiGensubService } from 'src/app/services/api-gensub/api-gensub.service';

@Component({
  selector: 'app-genressubgenre',
  templateUrl: './genressubgenre.component.html',
  styleUrls: ['./genressubgenre.component.css']
})
export class GenressubgenreComponent {

  gensubdata : any[] =[];
  search: string = '';
  errorStatus: boolean = false;
  errorMsj: any = "";

  constructor(private gensubService: ApiGensubService, private genreService: ApiGenreService){}

  ngOnInit(): void{
    this.getGenreSubgenres();
  }

  getGenreSubgenres(){
    this.gensubService.getGenresSubgenres().subscribe(
      data =>{
        this.gensubdata = data;
      }
    )
  }


}
