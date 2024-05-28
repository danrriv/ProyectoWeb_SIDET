import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerPanel, MatDatepickerControl } from '@angular/material/datepicker';
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


  bookForm: FormGroup;
  isNewBook: boolean = true;
  bookId:number;
  //Subgéneros
  subgenre: Subgenre[];
  selectedSubgenre: number;

  //Autores
  author: Author[];
  selectedAuthor: number;

  picker: MatDatepickerPanel<MatDatepickerControl<any>,any,any>;

  public book: Book = new Book()
  constructor(private bookService: BooksService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.initForm();
    this.loadSubgenre();
    this.loadAuthor();
    this.loadProduct();
    this.book.book_status = true;
    this.book.book_notification_status = false;
  }
  initForm(): void {
    this.bookForm = this.formBuilder.group({
      book_name: ['', Validators.required],
      book_editorial: ['', Validators.required],
      book_weight: ['', Validators.required],
      book_heigth: ['', Validators.required],
      book_width: ['', Validators.required],
      book_stock: ['', Validators.required],
      book_price: ['', Validators.required],
      book_year: ['', Validators.required],
      book_npages: ['', Validators.required],
      book_img: ['', Validators.required],
      book_synopsis: ['', Validators.required],
      selectedAuthor: [null, Validators.required],
      selectedSubgenre: [null, Validators.required],

    });
  }

  //Cargar datos
  loadSubgenre(): void {
    this.bookService.listSubgenre().subscribe((
      response: Subgenre[]) => {
      this.subgenre = response;
    }, (error) => {
      console.error(error);
    }
    );
  }

  loadAuthor(): void {
    this.bookService.listAuthor().subscribe((
      response: Author[]) => {
      this.author = response;
    }, (error) => {
      console.error(error);
    }
    );
  }

  loadProduct(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];

      if (id) {
        this.isNewBook = false;
        this.bookId = id;
        this.bookService.findIdBook(id).subscribe(
          (data) => {
            this.book = data;
            this.bookForm.patchValue({
              book_name: data.book_name,
              book_editorial: data.book_editorial,
              book_weight: data.book_weight,
              book_heigth: data.book_heigth,
              book_width: data.book_width,
              book_year: data.book_year,
              book_npages: data.book_npages,
              book_price: data.book_price,
              book_stock: data.book_stock,
              book_img: data.book_img,
              book_notification_status: true,
              book_status: true,
              book_synopsis: data.book_synopsis

            })
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
  createProduct() {
    if (this.bookForm.valid) {
      this.book = Object.assign({}, this.book, this.bookForm.value);

      if (this.isNewBook) {
        this.bookService.saveBook(this.book, this.bookForm.value.selectedSubgenre, this.bookForm.value.selectedAuthor)
          .subscribe(() => {
            this.router.navigate(['/mundo-literario/admin/mantenimiento-libros']);
            swal.fire(
              'Éxito!',
              'Libro registrado correctamente',
              'success'
            );
          }, (error) => {
            console.log(error);
          }
          );
      } else {
        this.bookService.updateBook(this.book, this.bookForm.value.selectedSubgenre, this.bookForm.value.selectedAuthor)
          .subscribe(() => {
            this.router.navigate(['/mundo-literario/admin/mantenimiento-libros']);
            swal.fire(
              'Éxito!',
              'Libro editado correctamente',
              'success'
            );
          }, (error) => {
            console.log(error);
          }
          );
      }
    }
  }

  /*
  editProduct() {
    this.bookService.updateBook(this.book, this.selectedSubgenre, this.selectedAuthor)
      .subscribe((book) => {
        this.router.navigate(['/mundo-literario/admin/mantenimiento-libros']);
        swal.fire(
          'Éxito!',
          'Libro editado correctamente',
          'success'
        )
      }, error => console.log(error));
  }
  */


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
