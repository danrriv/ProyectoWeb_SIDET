import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './customers/sales/car/car.component';
import { ProductsComponent } from './customers/sales/products/products.component';
import { MenuComponent } from './admin/menu/menu.component';
import { ProductComponent } from './admin/books/product/product.component';
import { RegisterComponent } from './customers/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { MainComponent } from './customers/main/main.component';
import { ProductFormComponent } from './admin/books/product-form/product-form.component';
import { AuthorComponent } from './admin/authors/author/author.component';
import { AuthorFormComponent } from './admin/authors/author-form/author-form.component';
import { CustomersPurchasesComponent } from './customers/customers-purchases/customers-purchases.component';
import { FooterComponent } from './customers/templates/footer/footer.component';
import { SaleConfirmationComponent } from './customers/sales/sale-confirmation/sale-confirmation.component';
import { HeaderComponent } from './customers/templates/header/header.component';
import { UserFormComponent } from './admin/users/user-form/user-form.component';
import { UserComponent } from './admin/users/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginUsersComponent } from './admin/users/login-users/login-users.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    ProductsComponent,
    MenuComponent,
    ProductComponent,
    RegisterComponent,
    LoginComponent,
    ConfirmationComponent,
    ResetpasswordComponent,
    CategoryComponent,
    CategoryFormComponent,
    GenreComponent,
    GenreFormComponent,
    SubgenreComponent,
    SubgenreFormComponent,
    GenressubgenreComponent,
    GenresubgenreFormComponent,
    MainComponent,
    ProductFormComponent,
    AuthorComponent,
    AuthorFormComponent,
    CustomersPurchasesComponent,
    HeaderComponent,
    FooterComponent,
    SaleConfirmationComponent,
    UserFormComponent,
    UserComponent,
    LoginUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
