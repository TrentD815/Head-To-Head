import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import { NavBarComponent} from "./nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Head-To-Head';
  isDarkTheme ?: boolean;
  playerProfile ?: any;

  receivePlayerProfileStatus($event: any) {
    this.playerProfile = $event;
  }

  receiveTheme($event:any) {
    this.isDarkTheme = $event;
  }
}
