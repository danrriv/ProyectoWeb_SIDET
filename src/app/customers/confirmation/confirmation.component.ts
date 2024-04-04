import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCustomersService } from 'src/app/services/api-customers/api-customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  token: string ="";

  constructor(
    private route: ActivatedRoute,
    private api_customer: ApiCustomersService,
    private router: Router) { }

    ngOnInit(): void {
      // Obtener el token de confirmación de la URL
      this.route.queryParams.subscribe(params => {
        this.token = params['token'];
      });
    }

  confirmAccount(): void {
    // confirmar cuenta con el token
    this.api_customer.confirmAccount(this.token).subscribe(
      response => {
        // Mostrar mensaje de confirmación
        Swal.fire('Bienvenido', 'Tu cuenta ha sido confirmada correctamente.', 'success');
        this.router.navigate(['mundo-literario/login']);
      },
      error => {
        console.error('Error al confirmar la cuenta:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al confirmar tu cuenta. Por favor, intenta nuevamente más tarde.',
          confirmButtonText: 'Ok'
        });
        this.router.navigate(['/']);
      }
    );
  }
  }