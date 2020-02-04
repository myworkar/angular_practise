import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;

  constructor() { }

  checkLogin() {
    if (localStorage.getItem('userName') != null) {
      return true;
    }
    return false;
  }

  setSession(data) {
    if (data && data.email) {
      localStorage.setItem('userName', data.email);
      localStorage.setItem('token', data.token);
    }
  }

  logout() {
    localStorage.removeItem('userName')
    localStorage.removeItem('token');
    return true;
  }

  getToken() {
    return localStorage.getItem('token');
  }

}