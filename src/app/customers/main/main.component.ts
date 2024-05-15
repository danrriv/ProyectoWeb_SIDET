import { Component, HostListener, OnInit } from '@angular/core';
import { Book } from 'src/app/clases/book/book';
import { BooksService } from 'src/app/services/api-books/books.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  lastScrollTop: number = 0;
  //Carrito de Compras

  constructor(private bookService:BooksService){}

  ngOnInit(): void{
  }

  /*
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.getElementById('navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > this.lastScrollTop) {
      // Cuando se hace scroll hacia abajo
      navbar?.classList.add('hidden');
    } else {
      // Cuando se hace scroll hacia arriba
      navbar?.classList.remove('hidden');
    }
    this.lastScrollTop = scrollTop;
  }
  */

}
