import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerLoginDto } from 'src/app/clases/customer/customerLoginDto';
import { Login } from 'src/app/clases/login/login';
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
  errorStatus: boolean = false;
  errorMsj: any = "";
  dto: CustomerLoginDto = new CustomerLoginDto();

  constructor(private apiCustomersService: ApiCustomersService,private router: Router) { }


  login(): void {

    if (!this.email || !this.password) {
      console.error('Correo electrónico o contraseña nulos');
      this.errorStatus = true;
      this.errorMsj = "Complete correctamente todos los campos.";
      return;
    }

    // Crea una instancia de la clase Login con los datos del formulario
    const loginData = new Login(this.email, this.password);

    this.apiCustomersService.login(loginData).subscribe(
      (response) => {
        console.log('Respuesta recibida:', response);
        
        // Verificar si la respuesta es un token válido
        if (response) {
          console.log('Inicio de sesión exitoso');
          Swal.fire('Bienvenido', '¡Inicio de sesión exitoso!', 'success');
          this.router.navigate(['/']);
          // Guardar el token en el almacenamiento local
          localStorage.setItem('token', response);
          //Guardar id y nombre del cliente en el almacenamiento local
          this.obtainLoginData();          
        } 
      },
      (error) => {
        console.error('Error en el inicio de sesión:', error);
        if (error.error === "La cuenta no está activa") {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La cuenta no está activa. Verifique su correo para activarla.'
          });
        }
        else Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Correo electrónico o contraseña incorrecta'
        });
      }
      
    );
  }
  obtainLoginData():void{
    this.apiCustomersService.obtainLoginData(this.email).subscribe(
      (data) =>{
        this.dto = data;
        localStorage.setItem('customer_id', this.dto.customer_id);
        localStorage.setItem('name', this.dto.customer_name);
        localStorage.setItem('logged','true' );
      },
      (error) =>{
        console.error(error);
      }
    );
  }
}