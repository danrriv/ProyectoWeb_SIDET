import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/clases/book/book';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
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

  constructor(private bookService: BooksService) {
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.listBook().subscribe((data) => {
      this.books = data;
      this.dataSource = new MatTableDataSource<Book>(this.books);
      this.dataSource.paginator = this.paginator;

    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.search.trim().toLowerCase(); // Aplica el filtro
  }

  exportExcel(): void {
    const filteredCustomers = this.books.map(b => ({
      book_id: b.book_id,
      book_name: b.book_name,
      book_weight: b.book_weight, //peso
      book_editorial: b.book_editorial,
      book_width: b.book_width, //alto
      book_heigth: b.book_heigth, //ancho
      book_stock: b.book_stock,
      book_price: b.book_price,
      book_npages: b.book_npages,
      book_year: b.book_year, //año de publicacion
      book_synopsis: b.book_synopsis,
      book_status: b.book_status,
      book_notification_status: b.book_notification_status,
      subgenre: b.subgenre,
      author: b.author
    }));

    // Crear una nueva hoja de trabajo y agregar la fecha en la primera fila
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([['Fecha de reporte:', new Date().toLocaleDateString()]]);
    
    // Agregar los datos de la tabla empezando desde la fila 3
    XLSX.utils.sheet_add_json(ws, filteredCustomers, { origin: 'A3', skipHeader: false });

    // Crear el libro de trabajo y agregar la hoja de trabajo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Productos');
    
    // Guardar el archivo Excel
    XLSX.writeFile(wb, 'reporte_productos.xlsx');
  }

  exportPdf(): void {
    const doc = new jsPDF();
    const col = ["ID", "Nombre", "Precio", "Editorial", "Stock","Autor","Subgénero"];
    const rows: any[][] = [];
  
    this.books.forEach(b => {
      const temp = [
        b.book_id,
        b.book_name,
        b.book_price,
        b.book_editorial,
        b.book_stock,
        b.author,
        b.subgenre
      ];
      rows.push(temp);
    });

    const currentDate = new Date().toLocaleDateString();
    doc.text('Reporte de Productos', 75, 16);
    doc.text(`Fecha de reporte: ${currentDate}`, 75, 23);
    autoTable(doc, { head: [col], body: rows, startY: 30 });
    doc.save('reporte_productos.pdf');
  }
  

}
