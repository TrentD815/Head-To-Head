import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Head-To-Head';
  isDarkTheme ?: boolean;
  playerProfile ?: any;
  toggleStatsWinnerAndLoser ?: boolean = true

  receivePlayerProfileStatus($event: any) {
    this.playerProfile = $event;
  }
  receiveTheme($event: any) {
    this.isDarkTheme = $event;
  }
  receiveStatWinnerAndLoser($event: any) {
    this.toggleStatsWinnerAndLoser = $event
  }
}
