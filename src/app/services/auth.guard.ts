import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree
    | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    return this.saveData(state.url);
  }

  saveData(url: string) {
    console.log("auth guard: saveData ---> ", url);
    if (this.authService.checkLogin()) {
      console.log("auth guard: saveData checkLogin ---> ", url);
      return true;
    }
    console.log("auth guard: saveData failed check login in ---> ", url);
    this.authService.redirectUrl = url;
    // Navigate to the login page 
    this.router.navigate(['/login']);
    return false;
  }
}