import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookCart } from 'src/app/clases/book-cart/book-cart';
import { Book } from 'src/app/clases/book/book';
@Injectable({
  providedIn: 'root'
})
export class CartProductsService {

  saleUrl: string = ''
  bookUrl: string = ''

  private myList: BookCart[] = [];
  private myCart = new BehaviorSubject<BookCart[]>([]);
  myCart$ = this.myCart.asObservable();

  constructor(private http: HttpClient) { }

  //Lógica del carrito
  addProduct(product: BookCart) {
    if (this.myList.length === 0) {
      product.book_quantity = 1;
      this.myList.push(product)
      this.myCart.next(this.myList)
    } else {
      const prod = this.myList.find((element) => {
        return element.book_id === product.book_id
      })
      if (prod) {
        prod.book_quantity = prod.book_quantity + 1;
        this.myCart.next(this.myList);
      } else {
        product.book_quantity = 1;
        this.myList.push(product);
        this.myCart.next(this.myList);
      }
    }
    this.setCart();
  }
  sumarCantidad(id: number): void {
    const product = this.myList.find((item) => item.book_id === id);

    if (product) {
      product.book_quantity += 1;
      this.myCart.next(this.myList);
      this.setCart();
    }
  }
  restarCantidad(id: number): void {
    const product = this.myList.find((item) => item.book_id === id);

    if (product) {
      product.book_quantity -= 1;
      if (product.book_quantity < 0) {
        product.book_quantity = 0;
      }
      this.myCart.next(this.myList);
      this.setCart();
    }
  }
  eliminarProducto(id: number) {
    this.myList = this.myList.filter((product) => {
      return product.book_id != id
    })
    this.myCart.next(this.myList);
    this.setCart();
  }
  findPById(id: number) {
    return this.myList.find((element) => {
      return element.book_id === id
    })
  }
  totalCart() {
    const total = this.myList.reduce(function (acc, product) { return acc + (product.book_quantity * product.book_price); }, 0)
    return total;
  }

  existsCart(): boolean {
    return localStorage.getItem('cart') != null;
  }

  setCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.myCart.getValue()));
  }

  getCart(): BookCart[] {
    const cartString = localStorage.getItem('cart');
    return cartString ? JSON.parse(cartString) : [];
  }

  clear(): void {
    localStorage.removeItem('cart');
    this.myCart.next([]);
    this.myList = [];
  }

  //Convertir objeto "Book" a "CartBook"
  convertCartBook(p:Book):BookCart{
    const productCart : BookCart = {
      book_id : p.book_id,
      book_name : p.book_name,
      book_price: p.book_price,
      book_quantity :1,
      book_img: p.book_img
    }
    return productCart
  }
}
