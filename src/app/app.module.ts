import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { StatNameComponent } from './stat-name/stat-name.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PlayerProfileComponent,
    NavBarComponent,
    PlayerStatsComponent,
    StatNameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
