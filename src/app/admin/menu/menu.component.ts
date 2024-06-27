import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
  isSubMenuOpenReports: boolean = false;
  isOpened = true;
  selectedSubOption: string = '';

  showLogo = false;

  constructor(private userService: ApiUsersService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.showLogo = true;
    if (this.userService.isAuthenticated()) {
      this.roleUser = localStorage.getItem('role');
      this.nameUser = localStorage.getItem('names');
      this.surnameUser = localStorage.getItem('surnames');
    }
    this.adjustSidenavMode(window.innerWidth);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLogo = event.urlAfterRedirects === '/mundo-literario/admin';
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustSidenavMode(event.target.innerWidth);
  }

  adjustSidenavMode(width: number) {
    if (width < 768) {
      this.isOpened = false;
    } else {
      this.isOpened = true;
    }
  }

  toggleSidenav() {
    this.isOpened = !this.isOpened;
  }


  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  toggleSubMenuReports() {
    this.isSubMenuOpenReports = !this.isSubMenuOpenReports;
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
