import { Component, OnInit } from '@angular/core';
import { PlayerStats} from "../player-stats";

@Component({
  selector: 'player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit {
  playerIdentity ?: string;
  playerStats ?: PlayerStats;
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
