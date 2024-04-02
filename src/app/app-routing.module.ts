import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './customers/register/register.component';
import { LoginComponent } from './customers/login/login.component';

const routes: Routes = [
  {
    path: 'mundo-literario/register',
    component: RegisterComponent
  },
  {
    path: 'mundo-literario/login',
    component: LoginComponent
  },
  // Otras rutas si las tienes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
