import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  name:string;
  books: Book[] = [];

  subgenre: string | null;

  constructor(private bookService:BooksService,
  private cartService:CartProductsService,
  private route: ActivatedRoute,){}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.subgenre = params['subgenre'];
      this.books = [];  // Limpiar la lista de libros antes de la búsqueda
      if (this.subgenre && this.subgenre.trim().length > 0) {
        this.bookService.searchBySubgenre(this.subgenre).subscribe(
          books => this.books = books,
          error => {
            console.error(error);
            this.books = []; 
          }
        );
      } else {
        this.listProductsRandom();
        this.listProductsGenre();
      }
    });
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
  this.bookService.findGenreId(4).subscribe((data) =>{
    return this.DramasAdultosProducts = data;
  })
}

search(name:string){
  this.bookService.findSimilarNameBook(name).subscribe((data) =>{
    return this.books = data;
  })

}


  async addToCart(product:Book){
    this.cartService.addProduct(this.cartService.convertCartBook(product));
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      background: '#F4D06F',
      iconColor: '#4e109f',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: false,
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
    nav: false,
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
