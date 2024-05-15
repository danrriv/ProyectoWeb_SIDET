import { Component, OnInit } from '@angular/core';
import { ApiCustomersService } from 'src/app/services/api-customers/api-customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {

  islogged: boolean = false;
  token: string | null = null;
  constructor(private customerService: ApiCustomersService){}

  ngOnInit(): void {
      this.token = localStorage.getItem('tokenCustomer');
      console.log(this.token)
      if(this.token!=null){
        this.islogged = true;
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

}
