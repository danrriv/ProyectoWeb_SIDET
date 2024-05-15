import { Component, OnInit } from '@angular/core';
import { MenuData } from 'src/app/clases/menuData/menu-data';
import { ApiCategoriesService } from 'src/app/services/api-categories/api-categories.service';
import { ApiCustomersService } from 'src/app/services/api-customers/api-customers.service';
import { CartProductsService } from 'src/app/services/cart-products/cart-products.service';
import { SalesService } from 'src/app/services/api-sales/sales.service';
import Swal from 'sweetalert2';

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
  viewCart: boolean = false;

  myCart$ = this.cartService.myCart$;


  constructor(private categotyService: ApiCategoriesService,
    private customerService: ApiCustomersService,
    private cartService: CartProductsService) {}


  ngOnInit(): void {
    if (this.isAuthenticated()) {
      this.customerName = localStorage.getItem('name') || 'error';
    }

    this.categotyService.menu().subscribe((data: MenuData[]) => {
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

      // Convierte el objeto en un array
      this.menuData = Object.values(groupedData).map((category: any) => {
        return {
          ...category,
          genre: Object.values(category.genre)
        };
      });
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

  //Manejo de Inicio y cierre de sesión
  onLogout() {
    this.customerService.logout();
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      background: '#3fc3ee',
      iconColor: 'white',
      showConfirmButton: false,
      timer: 1200,
      timerProgressBar: false,
      customClass: {
        title: 'white-title' // Utiliza la clase personalizada aquí para el título
      }
    });

    Toast.fire({
      icon: 'info',
      title: 'Sesión cerrada correctamente'
    });
  }

  isAuthenticated(): boolean {
    const storedValue = localStorage.getItem('logged');
    return storedValue !== null && storedValue === 'true';
  }

  //Carrito
  onToggleCart() {
    this.viewCart = !this.viewCart;
  };
}
