import {Component, Input, OnInit} from '@angular/core';
import { PlayerStats} from "../player-stats";

@Component({
  selector: 'player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss', '../app.component.scss']
})
export class PlayerStatsComponent implements OnInit {
  @Input() playerIdentity ?: string;
  player1Stats ?: PlayerStats;
  player2Stats ?: PlayerStats;

  // Compares players head to head stats for each stat to see whose was better
  async determineBetterStat(player1: PlayerStats, player2: PlayerStats){

  }
  // Apply styling based on the winner of a stat to see visually who has a better stat a bit faster
  async applyWinnerOrLoserStatColor(statBar:any) {

  }
  constructor() { }

  ngOnInit(): void {
      this.player1Stats = {
        gamesPlayed: 45,
        averageMinutesPlayed: 33.4,
        averagePoints: 25.0,
        averageAssists: 7.8,
        averageRebounds: 7.7,
        averageBlocks: .6,
        averageSteals: 1.1,
        averageFieldGoalsMade: 9.4,
        averageFieldGoalsAttempted: 18.3,
        averageFieldGoalPercentage: 51.3,
        average3PointersMade: 2.3,
        average3PointersAttempted: 6.3,
        average3PointPercentage: 36.5,
        averageFreeThrowsMade: 4.0,
        averageFreeThrowsAttempted: 5.7,
        averageFreeThrowPercentage: 69.8,
        averageOffensiveRebounds: .6,
        averageDefensiveRebounds: 7.0,
        averageTurnovers: 3.7,
        averagePersonalFouls: 1.6,
        plusMinus: 6.4
      }
      this.player2Stats = {
        gamesPlayed: 61,
        averageMinutesPlayed: 33.0,
        averagePoints: 28.1,
        averageAssists: 5.9,
        averageRebounds: 11.0,
        averageBlocks: 1.2,
        averageSteals: 1.2,
        averageFieldGoalsMade: 10.3,
        averageFieldGoalsAttempted: 18.0,
        averageFieldGoalPercentage: 56.9,
        average3PointersMade: 1.1,
        average3PointersAttempted: 3.6,
        average3PointPercentage: 30.3,
        averageFreeThrowsMade: 6.5,
        averageFreeThrowsAttempted: 9.5,
        averageFreeThrowPercentage: 68.5,
        averageOffensiveRebounds: 1.6,
        averageDefensiveRebounds: 9.4,
        averageTurnovers: 3.4,
        averagePersonalFouls: 2.8,
        plusMinus: 6.7
      }
  }
}
