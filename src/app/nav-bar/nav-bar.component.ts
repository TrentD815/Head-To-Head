import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss','../app.component.scss']
})
export class NavBarComponent implements OnInit {
  @Output() themeSwitchEvent = new EventEmitter<boolean>();
  isDarkTheme ?: boolean = false

  constructor() {}
  ngOnInit(): void {}

  switchTheme(checked: any): void {
      this.themeSwitchEvent.emit(checked);
      this.isDarkTheme = this.isDarkTheme === checked;
  }
}
