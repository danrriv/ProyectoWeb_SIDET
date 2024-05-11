import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/clases/login';
import { ApiCustomersService } from 'src/app/services/api-customers/api-customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm! : FormGroup

  constructor(
    private customerService: ApiCustomersService,
    private router: Router,
    private formBuilder: FormBuilder){}

    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email: ['',[Validators.required, Validators.email]],
        password: ['', Validators.required]
      })
    }

  login(): void {

    if (this.loginForm.invalid) {
      return;
    }

    this.customerService.login(this.loginForm.value).subscribe(
      (response) => {
        // Verificar si la respuesta es un token válido
        if (response) {
          console.log('Inicio de sesión exitoso');
          Swal.fire(
            'Éxito!',
            'Bienvenido',
            'success'
          );
          this.router.navigate(['/']);
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
}