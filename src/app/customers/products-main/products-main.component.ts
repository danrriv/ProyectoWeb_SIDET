import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Book } from 'src/app/clases/book/book';
import { BooksService } from 'src/app/services/api-books/books.service';
import { CartProductsService } from 'src/app/services/cart-products/cart-products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-main',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.css']
})
export class ProductsMainComponent implements OnInit {

  //Colecciones para los carruseles
  Randomproducts:Book[];
  ComicsProducts:Book[];
  InfantilesProducts:Book[];
  DramasAdultosProducts:Book[];


  constructor(private bookService:BooksService,
  private cartService:CartProductsService){}


ngOnInit(): void {
    this.listProductsRandom();
    this.listProductsGenre();
}


listProductsRandom():void{
  this.bookService.listRandom().subscribe((data) =>{
    return this.Randomproducts = data;
  })
}

listProductsGenre():void{
  this.bookService.findGenreId(1).subscribe((data) =>{
    return this.ComicsProducts = data;
  });
  this.bookService.findGenreId(2).subscribe((data) =>{
    return this.InfantilesProducts = data;
  })
  this.bookService.findGenreId(3).subscribe((data) =>{
    return this.DramasAdultosProducts = data;
  })
}


  async addToCart(product:Book){
    this.cartService.addProduct(this.cartService.convertCartBook(product));
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      background: '#cb9738',
      iconColor: 'purple',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: false,
      customClass: {
        title: 'purple-title' // Utiliza la clase personalizada aquí para el título
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
    dots:false,
    navSpeed:200,
    nav: true,
    autoplay: true,
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
