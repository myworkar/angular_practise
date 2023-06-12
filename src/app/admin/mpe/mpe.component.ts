import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mpe',
  templateUrl: './mpe.component.html',
  styleUrls: ['./mpe.component.css']
})
export class MpeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  setDisplayFormat(type: string) {
    console.log("setDisplayFormat type", type)
  }

  simpleItems: string[] = [
    'Pepper',
    'Salt',
    'Paprika'
  ];

  public activeProjectIndex: number;

  public activeProject(index: number): void {
    this.activeProjectIndex = index;
  }

}
