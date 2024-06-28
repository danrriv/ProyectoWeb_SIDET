import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUsersService } from 'src/app/services/api-users/api-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-users',
  templateUrl: './login-users.component.html',
  styleUrls: ['./login-users.component.css']
})
export class LoginUsersComponent implements OnInit{

  loginForm! : FormGroup;
  isLoading: boolean = false;

  constructor(
    private userService: ApiUsersService,
     private router:Router,
     private formBuilder: FormBuilder){}


  ngOnInit(): void {
    if(this.userService.isAuthenticated()){
      this.router.navigate(['/mundo-literario/admin'])
    }
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
  
    this.userService.login(this.loginForm.value).subscribe(
      data => {
        this.isLoading=true;
        setTimeout(() => {
          this.router.navigate(['/mundo-literario/admin']);
          Swal.fire(
            'Éxito!',
            'Bienvenido',
            'success'
          );
        }, 1500);
        
      },
      error => {
        if (error.error.message == "Su cuenta esta inactiva, comuníquese con el administrador") {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Su cuenta esta inactiva, comuníquese con el administrador'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Correo electrónico o contraseña incorrecta'
          });
        }
        console.error(error);
      }
    );
  }

}
