import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from './registration/registration.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegistrationComponent },
{ path: '', redirectTo: 'register', pathMatch: 'full' },
{ path: 'admin', component: AdminComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
