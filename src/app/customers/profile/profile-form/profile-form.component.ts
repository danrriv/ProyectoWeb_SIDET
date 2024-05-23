import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/clases/customer/customer';
import { ApiCustomersService } from 'src/app/services/api-customers/api-customers.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit{
  public customer:Customer = new Customer();
  customerForm: FormGroup;
  token: string | null = null;

  constructor(
    private customerService: ApiCustomersService,
    private formBuilder: FormBuilder,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      customer_dni: [{ value: '', disabled: true }],
      customer_names: ['', [Validators.required]],
      customer_surnames: ['', [Validators.required]],
      customer_phone_number: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      customer_email: [{ value: '', disabled: true }]
    });

    this.token = localStorage.getItem('tokenCustomer');
    console.log(this.token)
    if (this.token != null) {
      this.loadCustomer();
    }
  }


  loadCustomer(): void {
      if (this.token) {
        this.customerService.obtainProfile(this.token).subscribe(
          (data) => {
            this.customer = data;
            this.customerForm.patchValue({
              customer_dni: data.customer_dni,
              customer_names: data.customer_names,
              customer_surnames: data.customer_surnames,
              customer_phone_number: data.customer_phone_number,
              customer_email: data.customer_email
            });
          },
          (error) => {
            console.error(error);
          }
        );
      }
    };

  public updateCustomer(): void {
    if (this.customerForm.valid) {
      // Asignar los valores del formulario al objeto
      this.customer = Object.assign({}, this.customer, this.customerForm.value);
      
      // Enviar los datos al servicio
      this.customerService.updateCustomer(this.customer)
        .subscribe(
          (customer) => {
            this.router.navigate(['/mundo-literario/perfil']);
            Swal.fire(
              'Éxito!',
              'Se actualizaron sus datos.',
              'success'
            );
          },
          (error) => {
            console.error(error);
          }
        );
    }
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
    const isSpace = key === ' ';
    
    if (!isLetterWithAccents && !isBackspaceOrDelete && !isSpace) {
      event.preventDefault();
    }
  }

}
