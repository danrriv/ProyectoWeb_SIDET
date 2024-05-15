import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Book } from 'src/app/clases/book/book';
import { BooksService } from 'src/app/services/api-books/books.service';
import { CartProductsService } from 'src/app/services/cart-products/cart-products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  public book: Book = new Book()
  subgenreId:number;
  relatedBooks:Book[];

  constructor(private bookService:BooksService,
    private activatedRoute:ActivatedRoute,
    private cartService:CartProductsService){}

  ngOnInit(): void {
    this.loadProduct();
  }

  //Cargar producto
  loadProduct(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];

      if (id) {
        this.bookService.findNameBook(id).subscribe(
          (book) => {
            this.book = book;
            this.subgenreId = book.subgenre.subgenre_id;
            this.listRelatedBooks(this.subgenreId);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }
  mostrar(){
    console.log(this.relatedBooks)
  }
  //Cargar libros relacionados
  listRelatedBooks(id:number):void{
    this.bookService.findSubgenreId(id).subscribe((data) =>{
      return this.relatedBooks = data;
    })
  }

  //Carrito
  async addToCart(product:Book){
    this.cartService.addProduct(this.cartService.convertCartBook(product));
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      background: '#a5dc86',
      iconColor: 'white',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: false,
      customClass: {
        title: 'white-title' // Utiliza la clase personalizada aquí para el título
      }
    });
    await Toast.fire({
      icon: 'success',
      title: 'Producto agregado al carrito'
    });
  }

  //Configuración del carrusel
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag:true,
    touchDrag:true,
    pullDrag:true,
    dots:false,
    navSpeed:500,
    responsive: {
      0: {
        items: 1,
      },
      200: {
        items: 2,
      },
      400: {
        items: 3,
      },
      700: {
        items: 4,
      },
      1000: {
        items: 5,
      },
    }
  }

  
}
