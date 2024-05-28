import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/clases/book/book';
import { BooksService } from 'src/app/services/api-books/books.service';

@Component({
  selector: 'app-books-report',
  templateUrl: './books-report.component.html',
  styleUrls: ['./books-report.component.css']
})
export class BooksReportComponent implements OnInit {

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
  
  applyFilter(): void {
    this.dataSource.filter = this.search.trim().toLowerCase(); // Aplica el filtro
  }

}
