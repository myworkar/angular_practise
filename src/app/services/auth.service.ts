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
    if (data && data.emailId && data.password) {
      localStorage.setItem('userName', data.emailId);
      localStorage.setItem('token', data.password);
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