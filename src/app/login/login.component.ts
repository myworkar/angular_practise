import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showForgotPassword: boolean = false;
  loginForm: FormGroup;
  name: String;
  password: string;

  constructor(private router: Router, private formbuilder: FormBuilder) { }

  ngOnInit() {

  }

}