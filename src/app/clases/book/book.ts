import { Author } from "../author/author";
import { Subgenre } from "../subgenre/subgenre";


export class Book {
	  book_id:number;
      book_name:string;
	  book_weight:number; //peso
	  book_editorial:string;
	  book_width:number; //alto
	  book_heigth:number; //ancho
	  book_stock:number;
	  book_price:number;
	  book_npages:number;
      book_year:string; //año de publicacion
	  book_synopsis:string;
	  book_status:boolean;
	  book_img:string;
	  book_notification_status:boolean;
      subgenre: Subgenre;
	  author: Author
}
