import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Genresubgenre } from 'src/app/clases/genresubgenre/genresubgenre';
import { ApiGenreService } from 'src/app/services/api-genre/api-genre.service';
import { ApiGensubService } from 'src/app/services/api-gensub/api-gensub.service';

@Component({
  selector: 'app-genressubgenre',
  templateUrl: './genressubgenre.component.html',
  styleUrls: ['./genressubgenre.component.css']
})
export class GenressubgenreComponent {

  gensubdata : Genresubgenre[] =[];
  searchInput:string = '';
  dataSource: MatTableDataSource<Genresubgenre>;
  displayedColumns: string[] = ['genre','subgenre'];
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private gensubService: ApiGensubService){}

  ngOnInit(): void{
    this.getGenreSubgenres();
  }

  getGenreSubgenres(){
    this.gensubService.getGenresSubgenres().subscribe(
      data =>{
        this.gensubdata = data;
        this.dataSource = new MatTableDataSource<Genresubgenre>(this.gensubdata);
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
