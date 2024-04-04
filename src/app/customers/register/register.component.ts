import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/clases/customer';
import { ApiCustomersService } from 'src/app/services/api-customers/api-customers.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public customer: Customer = new Customer();
  form_register!: FormGroup;

  errorStatus: boolean = false;
  errorMsj: any = "";

  constructor(
    private api_customer: ApiCustomersService,
    private formBuilder: FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {
    this.form_register = this.formBuilder.group({
      customer_dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      customer_names: ['', [Validators.required]],
      customer_surnames: ['', [Validators.required]],
      customer_email: ['', [Validators.required, Validators.email]],
      customer_password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  validarNumerico(event: KeyboardEvent) {
    const key = event.key;
    const isNumber = /^[0-9]$/.test(key);
    const isBackspaceOrDelete = ['Backspace', 'Delete'].includes(key);
    
    if (!isNumber && !isBackspaceOrDelete) {
      event.preventDefault();
    }
  }

  validarNoNumerico(event: KeyboardEvent) {
    const key = event.key;
    const isLetterWithAccents = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ]$/u.test(key);
    const isBackspaceOrDelete = ['Backspace', 'Delete'].includes(key);
    
    if (!isLetterWithAccents && !isBackspaceOrDelete) {
      event.preventDefault();
    }
  }

  
  get f() { return this.form_register.controls; }

  public crearCliente(): void {
    if (this.form_register.invalid) {
      this.errorStatus = true;
      this.errorMsj = "Complete correctamente todos los campos.";
      return;
    }

   console.log('Registrando cliente...');
    this.api_customer.register(this.form_register.value)
      .subscribe(
        response => {
          Swal.fire('Bienvenido', '¡Registro exitoso! Revise su correo y confirme su cuenta.', 'success');
          this.router.navigate(['mundo-literario/login']);
        },
        error => {
          if (error?.error?.message === 'Ya tiene una cuenta, inicie sesión.') {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ya tiene una cuenta, inicie sesión',
              confirmButtonText: 'Ok'
            })
            this.router.navigate(['mundo-literario/login']);
        
          }
        }
      );
  }
}
