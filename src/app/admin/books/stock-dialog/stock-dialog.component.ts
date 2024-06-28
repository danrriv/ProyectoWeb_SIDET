import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BookDto } from 'src/app/clases/book/BookDto';
import { Book } from 'src/app/clases/book/book';
import { BooksService } from 'src/app/services/api-books/books.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-stock-dialog',
  templateUrl: './stock-dialog.component.html',
  styleUrls: ['./stock-dialog.component.css']
})
export class StockDialogComponent implements OnInit {

  book:Book;
  quantity:number = 0;
  dialogRef: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },
private bookService:BooksService,
private router:Router) {
  }

  ngOnInit(): void {
    this.loadBook();
      
  }

  get stockResultante(): number {
    return this.book ? this.book.book_stock + this.quantity : 0;
  }
  
  loadBook(){
    this.bookService.findIdBook(this.data.id).subscribe((b) =>{
      this.book = b;
    })
  }

  updateStock(q: number): void {
    const stockDto: BookDto = { stock: q };
    this.bookService.updateStock(this.book.book_id, stockDto).subscribe(
      bookResponse => {
        console.log(`Stock actualizado`, bookResponse);
        this.close();
        swal.fire(
          'Éxito!',
          'Stock actualizado correctamente',
          'success'
        );
        this.router.navigate(['mundo-literario/admin/mantenimiento-libros']);
      },
      stockError => {
        console.error(`Error al actualizar el stock`, stockError);
      }
    );
  }

  close(): void {
    this.bookService.closeDialog();
  }
  }


