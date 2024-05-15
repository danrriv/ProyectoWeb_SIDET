import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './customers/register/register.component';
import { LoginComponent } from './customers/login/login.component';
import { ConfirmationComponent } from './customers/confirmation/confirmation.component';
import { ResetpasswordComponent } from './customers/resetpassword/resetpassword.component';
import { CategoryComponent } from './admin/categories/category/category.component';
import { CategoryFormComponent } from './admin/categories/category-form/category-form.component';
import { GenreComponent } from './admin/genus/genre/genre.component';
import { GenreFormComponent } from './admin/genus/genre-form/genre-form.component';
import { SubgenreComponent } from './admin/subgenres/subgenre/subgenre.component';
import { SubgenreFormComponent } from './admin/subgenres/subgenre-form/subgenre-form.component';
import { GenressubgenreComponent } from './admin/genresubgenre/genressubgenre/genressubgenre.component';
import { GenresubgenreFormComponent } from './admin/genresubgenre/genresubgenre-form/genresubgenre-form.component';
import { MenuComponent } from './admin/menu/menu.component';
import { MainComponent } from './customers/main/main.component';
import { UserFormComponent } from './admin/users/user-form/user-form.component';
import { UserComponent } from './admin/users/user/user.component';
import { LoginUsersComponent } from './admin/users/login-users/login-users.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '' , redirectTo:'mundo-literario',
    pathMatch:'full'
  },
  { path:'mundo-literario',
    component:MainComponent
  },
  //Clientes
  {path: 'mundo-literario/register', component: RegisterComponent},
  {path: 'mundo-literario/login',component: LoginComponent},
  {path: 'mundo-literario/confirmation',component: ConfirmationComponent},
  { path: 'mundo-literario/reset-password',component: ResetpasswordComponent },

  //Usuario - login
  {path: 'mundo-literario/admin/login',component: LoginUsersComponent},

  {
    path:'mundo-literario/admin',
    component:MenuComponent,
     canActivate: [AuthGuard], // indica que el usuario debe iniciar sesion
     data: { requiresLogin: true },
  children:[
   //Categorías
   { path: 'mantenimiento-categorias',component: CategoryComponent},
   { path:  'form-categoria', component:CategoryFormComponent},
   { path:  'form-categoria/:id', component:CategoryFormComponent},
  //Géneros
  { path: 'mantenimiento-generos',component: GenreComponent},
  { path:  'form-genero', component:GenreFormComponent},
  { path:  'form-genero/:id', component:GenreFormComponent},
  //Subgéneros
  { path: 'mantenimiento-subgeneros',component: SubgenreComponent},
  { path:  'form-subgenero', component:SubgenreFormComponent},
  { path:  'form-subgenero/:id', component:SubgenreFormComponent},
  //Géneros - Sugéneros
  { path: 'mantenimiento-generos-subgeneros',component: GenressubgenreComponent},
  { path:  'form-genero-subgenero', component:GenresubgenreFormComponent},
  //Usuarios
  { path: 'mantenimiento-usuarios',component: UserComponent},
  {path: 'form-usuarios', component: UserFormComponent},
  {path: 'form-usuarios/:id', component: UserFormComponent},

  ]}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
