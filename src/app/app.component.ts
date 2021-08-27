import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { NavBarComponent} from "./nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Head-To-Head';
  isDarkTheme: boolean | undefined;

  receiveTheme($event:any) {
    this.isDarkTheme = $event;
    console.log("Is dark theme", this.isDarkTheme)
  }
}
