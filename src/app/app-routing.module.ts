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
import { ProductComponent } from './admin/books/product/product.component';
import { ProductFormComponent } from './admin/books/product-form/product-form.component';
import { AuthorComponent } from './admin/authors/author/author.component';
import { AuthorFormComponent } from './admin/authors/author-form/author-form.component';
import { MainComponent } from './customers/main/main.component';
import { CustomersPurchasesComponent } from './customers/customers-purchases/customers-purchases.component';
import { SaleConfirmationComponent } from './customers/sales/sale-confirmation/sale-confirmation.component';

const routes: Routes = [

  //Raíz
  {path:'', redirectTo:'mundo-literario',pathMatch:'full'},
  {path:'mundo-literario', component:MainComponent},

  //Clientes
  {path: 'mundo-literario/register', component: RegisterComponent},
  {path: 'mundo-literario/login',component: LoginComponent},
  {path: 'mundo-literario/confirmation',component: ConfirmationComponent},
  {path: 'mundo-literario/reset-password',component: ResetpasswordComponent },
  {path:'mundo-literario/compras', component:CustomersPurchasesComponent},
  {path: 'mundo-literario/continuar-compra',component:SaleConfirmationComponent},
   //Categorías
   { path: 'mundo-literario/admin/mantenimiento-categorias',component: CategoryComponent},
   { path:  'mundo-literario/admin/form-categoria', component:CategoryFormComponent},
   { path:  'mundo-literario/admin/form-categoria/:id', component:CategoryFormComponent},
  //Géneros
  { path: 'mundo-literario/admin/mantenimiento-generos',component: GenreComponent},
  { path:  'mundo-literario/admin/form-genero', component:GenreFormComponent},
  { path:  'mundo-literario/admin/form-genero/:id', component:GenreFormComponent},
  //Subgéneros
  { path: 'mundo-literario/admin/mantenimiento-subgeneros',component: SubgenreComponent},
  { path:  'mundo-literario/admin/form-subgenero', component:SubgenreFormComponent},
  { path:  'mundo-literario/admin/form-subgenero/:id', component:SubgenreFormComponent},
  //Géneros - Sugéneros
  { path: 'mundo-literario/admin/mantenimiento-generos-subgeneros',component: GenressubgenreComponent},
  { path:  'mundo-literario/admin/form-genero-subgenero', component:GenresubgenreFormComponent},
  //Productos - Libros
  {path: 'mundo-literario/admin/mantenimiento-libros', component:ProductComponent},
  {path: 'mundo-literario/admin/form-libros', component:ProductFormComponent},
  {path: 'mundo-literario/admin/form-libros/:id', component:ProductFormComponent},
  //Autores
  {path: 'mundo-literario/admin/mantenimiento-autores', component:AuthorComponent},
  {path: 'mundo-literario/admin/form-autor', component:AuthorFormComponent},
  {path: 'mundo-literario/admin/form-autor/:id', component:AuthorFormComponent},
  //Ventas
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
