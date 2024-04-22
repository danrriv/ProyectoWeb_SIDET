import { Component } from '@angular/core';
import { Book } from 'src/app/clases/book';
import * as XLSX from 'xlsx';
import { BooksService } from 'src/app/services/api-books/books.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  books: Book[];
  busqueda: string = '';
  errorStatus: boolean = false;
  errorMsj: any = "";

  constructor (private service:BooksService){
  }

  ngOnInit(): void{
    this.getBooks();
  }

  getBooks(){
    this.service.listBook().subscribe((data) =>{
      return this.books = data;
    });
  }

  /*
  buscarPorNombreAutorEditorial(nombre: string) {
    if(nombre.trim() === '') {
      this.getBooks();
    } else {
      this.service.buscarPorNombreAutorEditorial(nombre).subscribe(
        data=> {
          this.productos = data;
        },
        error => {
          if (error.error.message == "message", "Lo sentimos, no pudimos encontrar tu búsqueda.") {
            this.getProductos();
          } else {
            console.error('Error al buscar libro.')
          }
        }
      );
    }
  }
  */

  exportExcel(): void {
    let ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.books);

    let wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Libros');

    XLSX.writeFile(wb, 'reporte_libros.xlsx');
}

/*
exportPdf(): void {
  const doc = new jsPDF();

  var col = ["ID", "Nombre", "Editorial", "Autor", "Subgénero", "Stock", "Precio"];
  let rows : any[][] = [];

  this.productos.forEach(product => {
      let temp = [product.id_libro, product.nombre, product.editorial, product.nombre_autor, product.subgenero, product.stock, product.precio];
      rows.push(temp);
  });

  doc.text('Reporte de productos', 75, 16);
  
  autoTable(doc, {head: [col], body: rows, startY: 20 }); 

  doc.save('reporte_productos.pdf');
}*/
}
