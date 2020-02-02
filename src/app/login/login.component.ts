import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { HttpService } from '../services/httpService';
import { Constant } from '../../config/constant';
import { Error } from '../../config/error';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showForgotPassword: boolean = false;
  loginForm: FormGroup;
  login: Login;

  constructor(private router: Router, private formbuilder: FormBuilder, private http: HttpService, 
    private error: Error, private auth_service: AuthService) { }

  ngOnInit() {
    this.setLoginFormData();
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  setLoginFormData() {
    this.login = new Login();
    this.loginForm = this.formbuilder.group({
      email: [this.login.email, [Validators.required]],
      password: [this.login.password, [Validators.required]]
    })
  }

  loginSubmit() {
    console.log("login submit");
    this.http.post(Constant.server_url + Constant.api.login, this.loginForm.value).subscribe(data => {
      console.log("data --> ", data);
      this.auth_service.setSession(data);
      this.router.navigate(["admin"]);
    }, error => {
      this.error.status = true;
      this.error.message = error.message || Error.login;
      console.log(" error --> ", this.error);
    })
  }
}