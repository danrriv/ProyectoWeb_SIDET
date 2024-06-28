import { Component, OnInit } from '@angular/core';
import { CartProductsService } from 'src/app/services/cart-products/cart-products.service';
import Swal from 'sweetalert2';
import { BookCart } from 'src/app/clases/book-cart/book-cart';
import { BooksService } from 'src/app/services/api-books/books.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  myCart$ = this.cartService.myCart$;
  viewCart: boolean = false;
  stock:number

  constructor(
    private cartService: CartProductsService,
    private bookService: BooksService
  ) { }

  ngOnInit(): void {
  }

  totalProductos(precio: number, cantidad: number) {
    return precio * cantidad;
  }

  eliminarProducto(id: number) {
    this.cartService.eliminarProducto(id);
  }

  actSumProducto(id: number) {
    this.bookService.findStock(id).subscribe(stockData => {
      const stock = stockData.stock;
      if (this.cartService.puedeAgregarProducto(id, stock)) {
        this.cartService.sumarCantidad(id);
      } else {
        this.mostrarAdvertencia();
      }
    });
  }

  actRestProducto(id: number) {
    this.cartService.restarCantidad(id);
  }

  actUnidades(operacion: string, id: number) {
    const product = this.cartService.findPById(id);
    if (product) {
      if (operacion === 'minus' && product.book_quantity > 0) {
        this.actRestProducto(id);
      }
      if (operacion === 'add') {
        this.actSumProducto(id);
      }
      if (product.book_quantity === 0) {
        this.eliminarProducto(id);
      }
    }
  }

  totalCart() {
    return this.cartService.totalCart();
  }

  async mostrarAdvertencia() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      background: '#da2626',
      iconColor: '#ffffff',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: false,
    });
    await Toast.fire({
      icon: 'warning',
      title: 'Alcanzaste el límite de stock',
      color: '#f9f1f1'
    });
  }
}
