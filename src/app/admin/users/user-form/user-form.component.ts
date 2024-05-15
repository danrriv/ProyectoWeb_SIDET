import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/clases/user/user';
import { ApiUsersService } from 'src/app/services/api-users/api-users.service';
import Swal from 'sweetalert2';
import { Role } from 'src/app/clases/role/role';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  public user: User = new User();
  roles: Role[];
  roleSelect: number;
  userForm: FormGroup;
  isNewUser: boolean = true;

  constructor(
    private userService: ApiUsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.loadUser();
    this.loadRoles();
    this.userForm = this.formBuilder.group({
      user_dni: ['', Validators.required],
      user_names: ['', Validators.required],
      user_surnames: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      user_password: ['', [Validators.required, Validators.minLength(8)]],
      user_phone_number: [''], // No es requerido
      user_status: ['activo'], // Valor por defecto
      roleSelect: [null, Validators.required]
    });
  }

  loadUser(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];

      if (id) {
        this.isNewUser = false;
        this.userService.findUserbyId(id).subscribe(
          (data) => {
            this.user = data;
            this.userForm.patchValue({
              user_dni: data.user_dni,
              user_names: data.user_names,
              user_surnames: data.user_surnames,
              user_email: data.user_email,
              user_phone_number: data.user_phone_number,
              user_status: data.user_status,
              user_password: data.user_password,
              roleSelect: data.role?.role_id
            });
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  loadRoles(): void {
    this.userService.getRoles().subscribe(
      (response: Role[]) => {
        this.roles = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public createUser(): void {
    if (this.userForm.valid) {
      // Asignar los valores del formulario al objeto user
      this.user = Object.assign({}, this.user, this.userForm.value);
      
      // Enviar los datos al servicio
      this.userService.createUser(this.user, this.userForm.value.roleSelect)
        .subscribe(
          (user) => {
            this.router.navigate(['/mundo-literario/admin/mantenimiento-usuarios']);
            Swal.fire(
              'Éxito!',
              'Usuario registrado correctamente',
              'success'
            );
          },
          error => {
            if (error?.error?.message === 'Ya tiene una cuenta, inicie sesión.') {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El email ya tiene una cuenta.',
                confirmButtonText: 'Ok'
              });
            }
            console.error(error);
          }
        );
    } 
  }

  public updateUser(): void {
    if (this.userForm.valid) {
      // Asignar los valores del formulario al objeto user
      this.user = Object.assign({}, this.user, this.userForm.value);
      
      // Enviar los datos al servicio
      this.userService.updateUser(this.user, this.userForm.value.roleSelect)
        .subscribe(
          (user) => {
            this.router.navigate(['/mundo-literario/admin/mantenimiento-usuarios']);
            Swal.fire(
              'Éxito!',
              'Datos actualizados correctamente',
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
    
    if (!isLetterWithAccents && !isBackspaceOrDelete) {
      event.preventDefault();
    }
  }
}