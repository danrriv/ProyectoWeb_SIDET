import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './customers/car/car.component';
import { ProductsComponent } from './customers/products/products.component';
import { MenuComponent } from './admin/menu/menu.component';
import { ProductComponent } from './admin/product/product.component';
import { RegisterComponent } from './customers/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './customers/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    ProductsComponent,
    MenuComponent,
    ProductComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
