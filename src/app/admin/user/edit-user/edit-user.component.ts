import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/httpService';
import { Constant } from 'src/config/constant';

@Component({
  selector: 'app-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private router: Router, private http: HttpService) { }

  ngOnInit() {

  }

  imagePath = [];
  imageFiles = [];

  selfImageFiles(files: any) {
    for (let index = 0; index < files.target.files.length; index++) {
      this.imageFiles.push(files.target.files[index]);
    }
    this.imagePreview(files.target.files);
  }

  imagePreview(files: any) {
    for (let file of files) {
      let reader = new FileReader();
      console.log("reader ---", file)
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.imagePath.push(e.target.result);
      }
    }
  }

  submitUpdateDetails() {
    console.log("submit form");
    if (!this.imageFiles.length) {
      console.log(" no images available");
      return;
    }
    let formData = new FormData();
    for (let index = 0; index < this.imageFiles.length; index++) {
      let fileData = this.imageFiles[index];
      console.log("file data ", this.imageFiles[index])
      formData.append("file " + index, this.imageFiles[index]);
      formData.append("file_names", fileData.name);
      //formData.set("file_name " + index, fileData.name);
    }
    this.http.post(Constant.server_url + '/edituser', formData).subscribe((data) => {
      this.imageFiles = [];
      this.imagePath = [];
    },
      (error: any) => {
        this.imageFiles = [];
        this.imagePath = [];
        console.log("error while uploading file......" + error.status);
      })
  }
}
