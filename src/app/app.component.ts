import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import { NavBarComponent} from "./nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Head-To-Head';
  isDarkTheme: boolean | undefined;
  @Input() retrievedPlayerStats ?: any;

  receiveTheme($event:any) {
    this.isDarkTheme = $event;
    console.log("Is dark theme", this.isDarkTheme)
  }
}
