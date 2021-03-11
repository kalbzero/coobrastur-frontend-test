import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent } from './componets/Customer/Customer.component';
import { CustomerFormComponent } from './componets/Customer/Customer-form/Customer-form.component';
import { LoginComponent } from './componets/login/login.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: '', 
    component: CustomerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: CustomerFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: CustomerFormComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
