import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user/user';
import { ApiUsersService } from 'src/app/services/api-users/api-users.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit{

  public user:User = new User();
  token: string | null = null;

  constructor(
    private userService: ApiUsersService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token != null) {
      this.loadUser();
    }
  }

  loadUser(): void {
    if (this.token) {
      this.userService.obtainProfile(this.token).subscribe(
        (data) => {
          this.user = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  navigateToEditProfile(): void {
    this.router.navigate(['/mundo-literario/admin/perfil/ajustes']);
  }

}
