import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/clases/author/author';
import { Book } from 'src/app/clases/book/book';
import { Subgenre } from 'src/app/clases/subgenre/subgenre';
import { BooksService } from 'src/app/services/api-books/books.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  //Subgéneros
  subgenre : Subgenre[];
  selectedSubgenre:number;

  //Autores
  author: Author[];
  selectedAuthor: number;

  //Imagen
  //imageBytes: number[];

  //
  public book: Book = new Book()
  constructor(private bookService: BooksService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router ){}


  ngOnInit(): void {
    this.loadSubgenre();
    this.loadAuthor();
    this.loadProduct();
    this.book.book_status = true;
    this.book.book_notification_status = false;
  }

  //Imagen
  /*
  convertBytesToDataURL(bytes: number[]): string {
    const base64String = btoa(String.fromCharCode(...bytes));
    return `data:image/jpeg;base64,${base64String}`;
  }
  

  fileToByteArray(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);
        resolve(byteArray);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsArrayBuffer(file);
    });
  }
  */

  //Cargar datos
  loadSubgenre():void{
    this.bookService.listSubgenre().subscribe((
      response: Subgenre[]) =>{
        this.subgenre = response;
      }, (error) =>{
        console.error(error);
      }
    );
  }

  loadAuthor():void{
    this.bookService.listAuthor().subscribe((
      response: Author[]) =>{
        this.author = response;
      }, (error) =>{
        console.error(error);
      }
    );
  }

  loadProduct(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];

      if (id) {
        this.bookService.findIdBook(id).subscribe(
          (book) => {
            this.book = book;
            this.selectedSubgenre = book.subgenre?.subgenre_id || 0;
            this.selectedAuthor = book.author?.author_id ||0;
            //this.imageBytes = book.book_image;
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  //Notificaciones
  onCheckboxChange(event: any) {
    this.book.book_notification_status = event.target.checked;
}

  //Métodos CRUD
  saveProduct(){
    this.bookService.saveBook(this.book, this.selectedSubgenre, this.selectedAuthor)
    .subscribe((book) =>{
      this.router.navigate(['/mundo-literario/admin/mantenimiento-libros']);
      swal.fire(
        'Éxito!',
        'Libro registrado correctamente',
        'success'
      )
    }, error => console.log(error));
  }

  editProduct(){
    this.bookService.updateBook(this.book, this.selectedSubgenre, this.selectedAuthor)
    .subscribe((book) =>{
      this.router.navigate(['/mundo-literario/admin/mantenimiento-libros']);
      swal.fire(
        'Éxito!',
        'Libro editado correctamente',
        'success'
      )
    }, error => console.log(error));
  }


  //Validaciones
  validarNumerico(event: KeyboardEvent) {
    const key = event.key;
    const isNumber = /^[0-9.]$/.test(key); // Modificado: permite números y el punto decimal
    const isBackspaceOrDelete = ['Backspace', 'Delete'].includes(key);

    if (!isNumber && !isBackspaceOrDelete) {
      event.preventDefault();
    }
  }

  validarNum(event: KeyboardEvent) {
    const key = event.key;
    const isNumber = /^[0-9]$/.test(key);
    const isBackspaceOrDelete = ['Backspace', 'Delete'].includes(key);

    if (!isNumber && !isBackspaceOrDelete) {
      event.preventDefault();
    }
  }

}
