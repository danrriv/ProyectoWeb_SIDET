import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Genre } from 'src/app/clases/genre/genre';
import { ApiGenreService } from 'src/app/services/api-genre/api-genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent {

  genre : Genre[]=[];
  searchInput:string = '';
  dataSource: MatTableDataSource<Genre>;
  displayedColumns: string[] = ['genre_id','genre_name','category','actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private genreService: ApiGenreService,
  ){}

  ngOnInit():void {
    this.getGenres();
  }

  getGenres(){
    this.genreService.getGenre().subscribe(
      (data)=>{ 
        this.genre = data
        this.dataSource = new MatTableDataSource<Genre>(this.genre);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  applyFilter(): void {
    this.dataSource.filter = this.searchInput.trim().toLowerCase(); // Aplica el filtro
  }

}
