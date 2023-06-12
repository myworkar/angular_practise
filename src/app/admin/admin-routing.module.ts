import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../services/auth.guard';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { MpeComponent } from './mpe/mpe.component';

const routes: Routes = [{
  path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
    //    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'user', component: UserComponent },
    { path: 'edit/user', component: EditUserComponent },
    { path: 'mpe', component: MpeComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }