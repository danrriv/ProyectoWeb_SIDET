import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/clases/book/book';
import * as XLSX from 'xlsx';
import { BooksService } from 'src/app/services/api-books/books.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  books: Book[];
  dataSource: MatTableDataSource<Book>;
  search: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor (private bookService:BooksService){
  }

  ngOnInit(): void{
    this.getBooks();
  }

  getBooks(){
    this.bookService.listBook().subscribe((data) =>{
      this.books = data;
      this.dataSource = new MatTableDataSource<Book>(this.books);
      this.dataSource.paginator = this.paginator;

    });
  }

  
  findByName(name: string) {
    if(name.trim() === '') {
      this.getBooks();
    } else {
      this.bookService.findSimilarNameBook(name).subscribe(
        data=> {
          this.books = data;
        },
        error => {
          if (error.error.message == "message", "Lo sentimos, no pudimos encontrar tu búsqueda.") {
            this.getBooks();
          } else {
            console.error('Error al buscar libro.')
          }
        }
      );
    }
  }
  applyFilter(): void {
    this.dataSource.filter = this.search.trim().toLowerCase(); // Aplica el filtro
  }
}
