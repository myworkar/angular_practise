import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [{
  path: 'admin', component: AdminComponent, children: [
//    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'user', component: UserComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
