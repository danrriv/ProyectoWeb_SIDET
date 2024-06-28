import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Author } from 'src/app/clases/author/author';
import { AuthorsService } from 'src/app/services/api-authors/authors.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  authors: Author[]=[];
  dataSource: MatTableDataSource<Author>;
  search: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private authorService:AuthorsService){}

ngOnInit(): void {
    this.loadAuthors();
}

  loadAuthors(){
    this.authorService.listAuthor().subscribe((data) =>{
      this.authors = data;
      this.dataSource = new MatTableDataSource<Author>(this.authors);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.search.trim().toLowerCase(); // Aplica el filtro
  }

}
