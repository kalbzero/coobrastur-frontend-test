import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './componets/user/user.component';
import { UserListComponent } from './componets/user/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'add',
    component: UserListComponent
  },
  {
    path: 'edit/:id',
    component: UserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
