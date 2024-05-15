import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/clases/author/author';
import { AuthorsService } from 'src/app/services/api-authors/authors.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css']
})
export class AuthorFormComponent {

  public author:Author = new Author();
  errorStatus: boolean = false;
  errorMsj: any = "";

  constructor(
    private authorService: AuthorsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  loadAuthors(): void{
    this.activatedRoute.params.subscribe((params) =>{
      const id = +params['id'];
  
      if(id){
        this.authorService.findAuthorId(id).subscribe(
          (data) => {
            this.author = data;
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  
  saveAuthor(){
    this.authorService.saveAuthor(this.author).subscribe(
      (author) =>{
        this.router.navigate(['/mundo-literario/admin/mantenimiento-autor']);
        swal.fire(
          'Éxito!',
          'Autor registrado correctamente',
          'success'
        )
      }, error => console.log(error));
  }
  

  updateAuthor(){
    this.authorService.updateAuthor(this.author).subscribe(
      (author) =>{
        this.router.navigate(['/mundo-literario/admin/mantenimiento-autor']);
        swal.fire(
          'Éxito!',
          'Autor actualizado correctamente',
          'success'
        )
      }, error => console.log(error));
  }


  
}
