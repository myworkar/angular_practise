import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../services/auth.guard';
import { EditUserComponent } from './user/edit-user/edit-user.component';

const routes: Routes = [{
  path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
    //    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'user', component: UserComponent },
    { path: 'edit/user', component: EditUserComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AdminRoutingModule { }