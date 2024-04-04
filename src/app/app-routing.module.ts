import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './customers/register/register.component';
import { LoginComponent } from './customers/login/login.component';
import { ConfirmationComponent } from './customers/confirmation/confirmation.component';
import { ResetpasswordComponent } from './customers/resetpassword/resetpassword.component';

const routes: Routes = [
  {
    path: 'mundo-literario/register',
    component: RegisterComponent
  },
  {
    path: 'mundo-literario/login',
    component: LoginComponent
  },
  {
    path: 'mundo-literario/confirmation',
    component: ConfirmationComponent
  },
  { path: 'mundo-literario/reset-password',
   component: ResetpasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
