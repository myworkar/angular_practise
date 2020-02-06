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
  showLoadingIcon: boolean = true;

  constructor(private router: Router, private formbuilder: FormBuilder, private http: HttpService,
    private error: Error, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.checkLogin()) {
      console.log("check login from login com init");
      this.router.navigate(['/admin']);
      return;
    }
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
    this.showLoadingIcon = false;
  }

  loginSubmit() {
    console.log("login submit");
    this.http.post(Constant.server_url + Constant.api.login, this.loginForm.value).subscribe(data => {
      console.log("data --> ", data);
      this.authService.setSession(data);
      this.router.navigate(["admin"]);
    }, error => {
      this.error.status = true;
      this.error.message = error.message || Error.login;
      console.log(" error --> ", error);
    })
  }
}