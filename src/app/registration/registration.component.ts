import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from '../../config/constant';
import { Registration } from "../models/registration";
import { HttpService } from '../services/httpService';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registration: Registration;
  registrationForm: FormGroup = null;

  constructor(private router: Router, private formbuilder: FormBuilder, private http: HttpService,
    private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.checkLogin()) {
      console.log("check login from login com init");
      this.router.navigate(['/admin']);
      return;
    }
    this.setRegisterFormData();
  }

  setRegisterFormData() {
    this.registration = new Registration();
    this.registrationForm = this.formbuilder.group({
      name: [this.registration.name, [Validators.required, Validators.pattern(Constant.alphabet_space)]],
      email: [this.registration.email, [Validators.required, Validators.pattern(Constant.email)]],
      password: [this.registration.password, [Validators.required, Validators.pattern(Constant.passwordPattern)]],
      phone: [this.registration.phone, [Validators.required, Validators.pattern(Constant.phone)]],
      role: this.registration.role
    })
  }

  get name() {
    return this.registrationForm.get("name");
  }

  get email() {
    return this.registrationForm.get("email");
  }

  get password() {
    return this.registrationForm.get("password");
  }

  get phone() {
    return this.registrationForm.get("phone");
  }

  registrationSubmit() {
    let params = this.registrationForm.value;
    this.http.post(Constant.server_url + Constant.api.register, params).subscribe((data) => {
      console.log("Register response --/ ", data);
      this.authService.setSession(data);
      this.router.navigate(["admin"]);
    }, (error) => {
      console.log("Register response error --/ ", error);
    });
  }

}
