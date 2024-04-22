import { Subgenre } from "./subgenre";

export class Book {
	  book_id:number;
      name:string;
	  weight:number; //peso
	  editorial:string;
	  width:number; //alto
	  heigth:number; //ancho
	  stock:number;
	  price:number;
	  npages:number;
      year:string; //año de publicacion
	  synopsis:string;
	  status:string;
	  autor:string;
	  img:string;
      subgenre: Subgenre;
}
