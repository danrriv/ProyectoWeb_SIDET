import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/clases/author/author';
import { AuthorsService } from 'src/app/services/api-authors/authors.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  authors: Author[]=[];
  search: string = '';
  errorStatus: boolean = false;
  errorMsj: any = "";

  constructor(private authorService:AuthorsService){}

ngOnInit(): void {
    this.loadAuthors();
}

  loadAuthors(){
    this.authorService.listAuthor().subscribe((data) =>{
      this.authors = data;
    });
  }

}
