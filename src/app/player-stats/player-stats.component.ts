import {Component, Input, OnInit} from '@angular/core';
import { PlayerStats} from "../player-stats";

@Component({
  selector: 'player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss', '../app.component.scss']
})
export class PlayerStatsComponent implements OnInit {
  @Input() playerIdentity ?: string;
  playerStats ?: PlayerStats;

  // Compares players head to head stats for each stat to see whose was better
  async determineBetterStat(player1: PlayerStats, player2: PlayerStats){

  }
  // Apply styling based on the winner of a stat to see visually who has a better stat a bit faster
  async applyWinnerOrLoserStatColor(statBar:any) {

  }
  constructor() { }

  ngOnInit(): void {
    if (this.playerIdentity === "1") {
      this.playerStats = {
        averagePoints: 25.1,
        averageAssists: 7.8,
        averageRebounds: 7.7,
        averageBlocks: .6,
        averageSteals: 1.1,
        plusMinus: 6.4
      }
    }
    else {
      this.playerStats = {
        averagePoints: 28.1,
        averageAssists: 5.9,
        averageRebounds: 11,
        averageBlocks: 1.2,
        averageSteals: 1.2,
        plusMinus: 6.7
      }
    }
  }

}
