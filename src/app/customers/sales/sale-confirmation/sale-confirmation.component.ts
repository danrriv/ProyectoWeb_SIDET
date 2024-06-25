import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookCart } from 'src/app/clases/book-cart/book-cart';
import { SalesService } from 'src/app/services/api-sales/sales.service';
import { CartProductsService } from 'src/app/services/cart-products/cart-products.service';
import { environment } from 'src/app/clases/sales/mercadoPago';
import { SaleDetails } from 'src/app/clases/sales/saleDetails/sale-details';
import { Sale } from 'src/app/clases/sales/sale/sale';
import { SaleDto } from 'src/app/clases/sales/saleDto/sale-dto';
import { PrefenceService } from 'src/app/services/preferences/prefence.service';
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { BooksService } from 'src/app/services/api-books/books.service';
import { BookDto } from 'src/app/clases/book/BookDto';
@Component({
  selector: 'app-sale-confirmation',
  templateUrl: './sale-confirmation.component.html',
  styleUrls: ['./sale-confirmation.component.css']
})
export class SaleConfirmationComponent implements OnInit {

  customerId: number | null;

  cart: BookCart[] = [];

  myCart$ = this.cartService.myCart$;

  constructor(private cartService: CartProductsService,
    private saleService: SalesService,
    private preserv: PrefenceService,
    private bookService: BooksService
  ) { }


  ngOnInit(): void {
    const storedId = localStorage.getItem('id');
    this.customerId = storedId ? parseInt(storedId) : null;
  }

  saleRegister(): void {
    const cartProducts = this.cartService.getCart();
    // Array para almacenar los detalles de venta
    // Recorre el array de productos del carrito y crea los detalles de venta
    const saleDetails: SaleDetails[] = cartProducts.map(product => {
      const data: SaleDetails = {
        saleDetails_quantity: product.book_quantity,
        saleDetails_unit_price: product.book_price,
        saleDetails_subtotal: product.book_quantity * product.book_price,
        book: {
          book_id: product.book_id
        }
      };
      return data;
    });
    // Datos de la venta
    const sale: Sale = {
      sale_total: this.cartService.totalCart(),
      sale_total_products: cartProducts.length,
      customer: {
        customer_id: localStorage.getItem('idCustomer')
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
                cartProducts.forEach(product => {
                  const stockDto: BookDto = { stock: -product.book_quantity }; 
                  this.bookService.updateStock(product.book_id, stockDto).subscribe(
                    bookResponse => {
                      console.log(`Stock actualizado para el libro ID ${product.book_id}`, bookResponse);
                    },
                    stockError => {
                      console.error(`Error al actualizar el stock para el libro ID ${product.book_id}`, stockError);
                    }
                  );
                });
      },
      error => {
        console.error('Error al registrar la venta:', error);
      }
    );

    this.createPreference();
  }
  //Total carrito
  totalCart() {
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
          id: it.book_id,
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

  createPreference(): any {
    const preference = this.preserv.createPrefence(this.getItemsList());

    preference.subscribe(pr => {
      const { sandbox_init_point } = pr as ({ [key: string]: string, sandbox_init_point: string });
      location.href = sandbox_init_point;
    })
  }
}
