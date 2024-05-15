import { Component } from '@angular/core';
import { CartProductsService } from 'src/app/services/cart-products/cart-products.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {

  
  constructor(
    private cartService: CartProductsService,
  ) { }


  ngOnInit(): void {
  }

  myCart$ = this.cartService.myCart$;

  viewCart: boolean = false;

  totalProductos(precio: number, cantidad: number) {
    return precio * cantidad
  }
  eliminarProducto(id: number) {
    this.cartService.eliminarProducto(id);
  }
  actSumProducto(id:number){
    this.cartService.sumarCantidad(id);
  }

  actRestProducto(id:number){
    this.cartService.restarCantidad(id)
  }

  actUnidades(operacion: string, id: number) {
    const product = this.cartService.findPById(id)
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
    const r = this.cartService.totalCart();
    return r;
  }
  

}
