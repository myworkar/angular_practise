import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/httpService';
import { Constant } from 'src/config/constant';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private http: HttpService) { }

  ngOnInit() {
    this.http.get(Constant.server_url + Constant.api.users).subscribe(data => {
      console.log("get total users ", data);
    }, error => {
      console.error("failed retriving users");
    })
  }

}
