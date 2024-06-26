import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/clases/user/user';
import { ApiUsersService } from 'src/app/services/api-users/api-users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  users: User[] = [];
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['user_id','user_dni', 'user_surnames', 'user_names', 'user_phone_number', 'user_status', 'role', 'actions'];
  searchInput:string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: ApiUsersService){}

  ngOnInit():void{
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchInput.trim().toLowerCase(); // Aplica el filtro
  }

}
