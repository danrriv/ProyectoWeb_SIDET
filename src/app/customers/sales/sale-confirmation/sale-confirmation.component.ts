import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookCart } from 'src/app/clases/book-cart/book-cart';
import { SalesService } from 'src/app/services/api-sales/sales.service';
import { CartProductsService } from 'src/app/services/cart-products/cart-products.service';
import { environment } from 'src/app/clases/sales/mercadoPago';
import { SaleDetails } from 'src/app/clases/sales/saleDetails/sale-details';
import { Sale } from 'src/app/clases/sales/sale/sale';
import { SaleDto } from 'src/app/clases/sales/saleDto/sale-dto';
@Component({
  selector: 'app-sale-confirmation',
  templateUrl: './sale-confirmation.component.html',
  styleUrls: ['./sale-confirmation.component.css']
})
export class SaleConfirmationComponent implements OnInit {

  customerId: number | null;

  cart: BookCart[] = [];

  myCart$ = this.cartService.myCart$;


  //client = new MercadoPagoConfig({ accessToken: environment.KEY });

  constructor(private cartService: CartProductsService,
    private saleService: SalesService,
    private router: Router
    ) { }


  ngOnInit(): void {
    const storedId = localStorage.getItem('id');
    this.customerId = storedId ? parseInt(storedId) : null;
    //localStorage.setItem('sale?',":)")
  }

  saleRegister(): void {
    const cartProducts = this.cartService.getCart();

    // Array para almacenar los detalles de venta
    const saleDetails: SaleDetails[] = [];
    // Recorre el array de productos del carrito y crea los detalles de venta
    cartProducts.forEach(product => {
      const data: SaleDetails = {
        saleDetails_quantity: product.book_quantity,
        saleDetails_unit_price: product.book_price,
        saleDetails_subtotal: product.book_quantity * product.book_price,
        book: {
          book_id: product.book_id
        }
      };
      saleDetails.push(data);
    });

    // Datos de la venta
    const sale: Sale = {
      sale_total: this.cartService.totalCart(),
      sale_total_products: cartProducts.length,
      customer: {
        customer_id: Number(localStorage.getItem('customer_id'))
      }
    };

    const saleDto: SaleDto = {
      sale: sale,
      details: saleDetails
    };
    // Llamar al servicio de registro de ventas para enviar los datos al servidor
    this.saleService.registerSale(saleDto).subscribe(
      response => {
        console.log('Venta registrada con éxito:', response);
      },
      error => {
        console.error('Error al registrar la venta:', error);
      }
    );
  }
  //Total carrito
  totalCart(){
    const r = this.cartService.totalCart();
    return r
  }
  //Asignar items
  getItemsList(): any[] {
    const items: any[] = [];
    let item = {};
    this.myCart$.subscribe((productos: BookCart[]) => {
      productos.forEach((it: BookCart) => {
        item = {
          currency_id: 'PEN',
          title: it.book_name,
          quantity: it.book_quantity,
          unit_price: it.book_price
        };
        items.push(item);
      });
    });
    return items;
  }

  //Inicializando MercadoPago "servidor"
  /*
  createPreference(): any{
  const preference = new Preference(this.client);
  const result = preference.create({ 
    body: {
      items: this.getItemsList()
      ,
      back_urls: {
        success: "",
        failure: "",
        pending: "",
      },
      auto_return: "approved",
    }
  })
  localStorage.setItem('preference', JSON.stringify(result))
  }
  */



  //Lógica para la pasarela
  /*
  totalCart() {
    const r = this.tiendaService.totalCart();
    return r;
  }

  getItemsList(): any[] {

    const items: any[] = [];
    let item = {};

    this.myCart$.subscribe((productos: Productos[]) => {
      productos.forEach((it: Productos) => {
        item = {
          name: it.nombre,
          quantity: it.stock,
          unit_amount: { value: it.precio, currency_code: 'USD' }
        };
        items.push(item);
      });
    });
    return items;
  }
  */
}
