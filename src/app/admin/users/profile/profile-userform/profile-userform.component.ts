import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/clases/role/role';
import { User } from 'src/app/clases/user/user';
import { ApiUsersService } from 'src/app/services/api-users/api-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-userform',
  templateUrl: './profile-userform.component.html',
  styleUrls: ['./profile-userform.component.css']
})
export class ProfileUserformComponent implements OnInit{
  public user:User = new User();
  roles: Role[];
  roleSelect: number;
  userForm: FormGroup;
  token: string | null = null;

  constructor(
    private userService: ApiUsersService,
    private formBuilder: FormBuilder,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      user_dni: ['', [Validators.required]],
      user_names: ['', [Validators.required]],
      user_surnames: ['', [Validators.required]],
      user_phone_number: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      user_email: ['', []],
      roleSelect: [{ value: '', disabled: true }]
    });

    this.token = localStorage.getItem('token');
    if (this.token != null) {
      this.loadUser();
      this.loadRoles();
    }
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

  loadUser(): void {
    if (this.token) {
      this.userService.obtainProfile(this.token).subscribe(
        (data) => {
          this.user = data;
          this.userForm.patchValue({
            user_dni: data.user_dni,
            user_names: data.user_names,
            user_surnames: data.user_surnames,
            user_phone_number: data.user_phone_number,
            user_email: data.user_email,
            roleSelect: data.role?.role_id
          });
          this.roleSelect = data.role?.role_id || '';
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  public updateUser(): void {
    if (this.userForm.valid) {
      // Asignar los valores del formulario al objeto user
      this.user = Object.assign({}, this.user, this.userForm.value);
      
      // Enviar los datos al servicio
      this.userService.updateUser(this.user, this.roleSelect)
        .subscribe(
          (user) => {
            this.router.navigate(['/mundo-literario/admin/perfil']);
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
    const isSpace = key === ' ';
    
    if (!isLetterWithAccents && !isBackspaceOrDelete && !isSpace) {
      event.preventDefault();
    }
  }

}
