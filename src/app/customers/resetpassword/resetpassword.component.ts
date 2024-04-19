import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCustomersService } from 'src/app/services/api-customers/api-customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  email: string ="";
  resetCode: string="";
  newPassword: string="";
  confirmPassword: string="";
  resetCodeSent: boolean | undefined;
  resetSuccess: boolean | undefined;
  error: string="";
  passwordValid: boolean = true;

  constructor(private apiService: ApiCustomersService, private router: Router) { }

  ngOnInit(): void {
    this.resetCodeSent = false;
    this.resetSuccess = false;
    this.error = '';
  }

  validatePassword(): void {
    this.passwordValid = this.newPassword.length >= 8;
  }

  sendResetCode(): void {
    // Verificar si el campo de correo electrónico está vacío
    if (!this.email.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor ingrese su correo electrónico',
        confirmButtonText: 'Ok'
      });
      return;
    }

  
    // Continuar con el envío del código de restablecimiento
    this.apiService.sendResetCode(this.email).subscribe(
      () => {
        this.resetCodeSent = true;
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El correo electrónico no está asociado a una cuenta existente.',
          confirmButtonText: 'Entendido'
        })
      }
    );
}

gotoLogin(): void {
  this.router.navigate(['mundo-literario/login']);
}

  resetPassword(): void {

    this.validatePassword();

     // Verificar si las contraseñas coinciden
     if (this.newPassword !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        confirmButtonText: 'Ok'
      });return;
    }

    if (!this.passwordValid) {
      return;
  }

    this.apiService.resetPassword(this.resetCode, this.newPassword, this.email).subscribe(
      () => {
        this.resetSuccess = true;
        Swal.fire('¡En hora buena!', 'Se ha restablecido su contraseña correctamente', 'success');
        setTimeout(() => {
          this.router.navigate(['mundo-literario/login']);
        }, 3000); // Redirigir después de 3 segundos
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El código de restablecimiento no es válido',
          confirmButtonText: 'Ok'
        });
      }
    );
  }
}