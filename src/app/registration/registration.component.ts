import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from '../../config/constant';
import { Registration } from "../models/registration";
import { HttpService } from '../services/httpService';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registration: Registration;
  registrationForm: FormGroup;

  constructor(private router: Router, private formbuilder: FormBuilder, private http: HttpService) { }

  ngOnInit() {
    this.setRegisterFormData();
  }

  setRegisterFormData() {
    this.registration = new Registration();
    this.registrationForm = this.formbuilder.group({
      name: [this.registration.name, [Validators.required, Validators.pattern(Constant.alphabet_space)]],
      emailId: [this.registration.emailId, [Validators.required, Validators.pattern(Constant.emailId)]],
      password: [this.registration.password, [Validators.required, Validators.pattern(Constant.passwordPattern)]],
      phone: [this.registration.phone, [Validators.required, Validators.pattern(Constant.phone)]]
    })
  }

  get name() {
    return this.registrationForm.get("name");
  }

  get emailId() {
    return this.registrationForm.get("emailId");
  }

  get password() {
    return this.registrationForm.get("password");
  }

  get phone() {
    return this.registrationForm.get("phone");
  }

  registrationSubmit() {
    let params = this.registrationForm.value;
    this.http.post(Constant.server_url + Constant.apis.register, params).subscribe((data) => {
      console.log("Register response --/ ", data);
      this.router.navigate(["admin"]);
    }, (error) => {
      console.log("Register response error --/ ", error);
    });
  }

}
