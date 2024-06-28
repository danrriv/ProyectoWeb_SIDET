import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUsersService } from 'src/app/services/api-users/api-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resetuserpassword',
  templateUrl: './resetuserpassword.component.html',
  styleUrls: ['./resetuserpassword.component.css']
})
export class ResetuserpasswordComponent implements OnInit{
  email: string ="";
  resetCode: string="";
  newPassword: string="";
  confirmPassword: string="";
  resetCodeSent: boolean | undefined;
  resetSuccess: boolean | undefined;
  errorMsj: string="";
  passwordValid: boolean = false;

  constructor(private userService: ApiUsersService, private router: Router) { }

  ngOnInit(): void {
    this.resetCodeSent = false;
    this.resetSuccess = false;
    this.passwordValid = false;
    this.errorMsj = '';
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
    this.userService.sendResetCode(this.email).subscribe(
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
  this.router.navigate(['mundo-literario/admin/login']);
}

  resetPassword(): void {

    this.errorMsj= "";

     // Verificar si las contraseñas coinciden
     if (this.newPassword !== this.confirmPassword) {
      this.errorMsj= "Las contraseñas no coinciden"
      return;
    }

    else if(this.resetCode.length==0 || this.newPassword.length==0 || this.confirmPassword.length==0){
      this.errorMsj= "Complete los campos correctamente"
      return;
    }

    else if (this.newPassword == this.confirmPassword){
      if (this.newPassword.length < 8 || this.confirmPassword.length < 8) {
      this.errorMsj= "Su contraseña debe tener un mínimo 8 carácteres"
      return;
    }
  }


    this.userService.resetPassword(this.resetCode, this.newPassword, this.email).subscribe(
      () => {
        this.resetSuccess = true;
        Swal.fire('¡En hora buena!', 'Se ha restablecido su contraseña correctamente', 'success');
        setTimeout(() => {
          this.gotoLogin();
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
