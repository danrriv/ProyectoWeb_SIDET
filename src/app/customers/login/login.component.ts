import { Component } from '@angular/core';
import { Login } from 'src/app/clases/login';
import { ApiCustomersService } from 'src/app/services/api-customers/api-customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private apiCustomersService: ApiCustomersService) { }

  empty(): boolean {
    return !this.email.trim() || !this.password.trim();
  }

  login(): void {
    // Crea una instancia de la clase Login con los datos del formulario
    const loginData = new Login(this.email, this.password);

    this.apiCustomersService.login(loginData).subscribe(
      (response) => {
        console.log('Respuesta recibida:', response);
        
        // Verificar si la respuesta es un token válido
        if (response) {
          console.log('Inicio de sesión exitoso');
          Swal.fire('Bienvenido', '¡Inicio de sesión exitoso!', 'success');
          // Guardar el token en el almacenamiento local
          localStorage.setItem('token', response);
          
        } 
      },
      (error) => {
        console.error('Error en el inicio de sesión:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrecta'
        });
      }
    );
  }
}