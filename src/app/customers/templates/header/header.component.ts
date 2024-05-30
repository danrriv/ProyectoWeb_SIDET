import { Component, OnInit } from '@angular/core';
import { ApiCustomersService } from 'src/app/services/api-customers/api-customers.service';
import { CartProductsService } from 'src/app/services/cart-products/cart-products.service';
import { SalesService } from 'src/app/services/api-sales/sales.service';
import Swal from 'sweetalert2';
import { ApiCategoriesService } from 'src/app/services/api-categories/api-categories.service';
import { MenuData } from 'src/app/clases/menuData/menu-data';
import { Customer } from 'src/app/clases/customer/customer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuData: any[] = [];
  categories: any = {};

  customerName: string;

  showMenu: boolean = false;
  showSubMenu: boolean = false;

  customer:Customer = new Customer();
  viewCart: boolean = false;
  islogged: boolean = false;
  token: string | null = null;
  myCart$ = this.cartService.myCart$;


  constructor(
    private customerService: ApiCustomersService,
    private cartService: CartProductsService,
    private categoryService: ApiCategoriesService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('tokenCustomer');
    if (this.token != null) {
      this.islogged = true;
      this.setCustomerData();
    }
    this.categoryService.menu().subscribe((data: MenuData[]) => {
      this.menuData = data;

      let groupedData: any = {};

      for (let data of this.menuData) {
        if (!groupedData[data.category_name]) {
          groupedData[data.category_name] = {
            name: data.category_name,
            genre: {}
          };
        }

        if (data.genre_name && !groupedData[data.category_name].genre[data.genre_name]) {
          groupedData[data.category_name].genre[data.genre_name] = {
            name: data.genre_name,
            subgenre: []
          };
        }

        if (data.subgenre_name) {
          groupedData[data.category_name].genre[data.genre_name].subgenre.push(data.subgenre_name);
        }
      }

      console.log(groupedData)
      // Convierte el objeto en un array
      this.menuData = Object.values(groupedData).map((category: any) => {
        return {
          ...category,
          genre: Object.values(category.genre)
        };
      });+

      console.log(this.menuData);
    });
  }

  setCustomerData(){
    if(this.token){
      this.customerService.obtainProfile(this.token).subscribe(
        (data) => {
         this.customer = data;
         localStorage.setItem('idCustomer',this.customer.customer_id);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

logout() {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres cerrar sesión?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      this.customerService.logout();
      this.islogged = false;
    }
  });
}

//Manejo del menú dinámico
getKeys(obj: any): string[] {
  return Object.keys(obj);
}

toggleMenu() {
  this.showMenu = !this.showMenu;
}

toggleSubMenu() {
  if (this.showMenu) {
    this.showSubMenu = !this.showSubMenu;
  }
}
//Carrito
onToggleCart() {
  this.viewCart = !this.viewCart;
};

}
