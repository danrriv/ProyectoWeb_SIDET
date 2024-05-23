import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/clases/customer/customer';
import { ApiCustomersService } from 'src/app/services/api-customers/api-customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  public customer:Customer = new Customer();
  token: string | null = null;

  constructor(
    private customerService: ApiCustomersService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.token = localStorage.getItem('tokenCustomer');
    if (this.token != null) {
      this.loadCustomer();
    }
  }

  loadCustomer(): void {
    if (this.token) {
      this.customerService.obtainProfile(this.token).subscribe(
        (data) => {
          this.customer = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  navigateToEditProfile(): void {
    this.router.navigate(['/mundo-literario/perfil/ajustes']);
  }

}
