import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './customers/car/car.component';
import { ProductsComponent } from './customers/products/products.component';
import { MenuComponent } from './admin/menu/menu.component';
import { ProductComponent } from './admin/product/product.component';
import { MainComponent } from './customers/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    ProductsComponent,
    MenuComponent,
    ProductComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
