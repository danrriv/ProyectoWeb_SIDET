import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/clases/author/author';
import { AuthorsService } from 'src/app/services/api-authors/authors.service';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';
@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css']
})
export class AuthorFormComponent implements OnInit {

  authorForm: FormGroup;
  isNewAuthor: boolean = true;
  authorId: number;

  constructor(
    private authorService: AuthorsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
      this.initForm();
      this.loadAuthor();
  }

  initForm(): void {
    this.authorForm = this.formBuilder.group({
      author_name: ['', Validators.required]
    });
  }

  loadAuthor(): void{
    this.activatedRoute.params.subscribe((params) =>{
      const id = +params['id'];
      if(id){
        this.isNewAuthor = false;
        this.authorId = id;
        this.authorService.findAuthorId(id).subscribe(
          (data) => {
            this.authorForm.patchValue({
              author_name: data.author_name
            });
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  public saveAuthor(): void {
    if (this.authorForm.valid) {
      const authorData = this.authorForm.value;
      const author: Author = {
        author_id: this.authorId,
        author_name: authorData.author_name
      };

      if (this.isNewAuthor) {
        this.authorService.saveAuthor(author).subscribe(
          () => {
            this.router.navigate(['/mundo-literario/admin/mantenimiento-autores']);
            Swal.fire('Éxito!', 'Autor registrado correctamente', 'success');
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        this.authorService.updateAuthor(author).subscribe(
          () => {
            this.router.navigate(['/mundo-literario/admin/mantenimiento-autores']);
            Swal.fire('Éxito!', 'Autor actualizado correctamente', 'success');
          },
          (error) => {
            console.error(error);
          }
        );
      }
    } 
  }
}
