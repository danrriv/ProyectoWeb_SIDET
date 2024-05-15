import { Component, OnInit } from '@angular/core';
import { ApiUsersService } from 'src/app/services/api-users/api-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  roleUser: string | null = null;
  nameUser: string | null = null;
  surnameUser: string | null = null;

  isSubMenuOpen: boolean = false;
  selectedSubOption: string = '';

  constructor(private userService: ApiUsersService){}

  ngOnInit(): void {
    if (this.userService.isAuthenticated()) {
    this.roleUser = localStorage.getItem('role');
    this.nameUser = localStorage.getItem('names');
    this.surnameUser = localStorage.getItem('surnames');
  }
  }

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
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
        this.userService.logout();
      }
    });
  }
}
