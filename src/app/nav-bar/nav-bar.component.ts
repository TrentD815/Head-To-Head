import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss','../app.component.scss']
})
export class NavBarComponent implements OnInit {
  darkTheme: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
    this.darkTheme = false;
  }

  switchTheme(value:boolean): void {
    this.darkTheme = value;
    console.log(this.darkTheme);

  }
}
