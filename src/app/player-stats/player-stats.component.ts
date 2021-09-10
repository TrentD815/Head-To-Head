import {Component, Input, OnInit} from '@angular/core';
import { PlayerStats} from "../player-stats";
const axios = require('axios');

@Component({
  selector: 'player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss', '../app.component.scss']
})
export class PlayerStatsComponent implements OnInit {
  @Input() playerIdentity ?: string;
  @Input() isDarkTheme ?: boolean;
  @Input() playerProfile ?: any;
  player1Stats ?: PlayerStats;
  player2Stats ?: PlayerStats;


  async updatePlayerStats () {
    if (this.playerProfile) {
      const playerStatsResponse = await this.getPlayerStats(this.playerProfile);
      await this.fillPlayerStats(playerStatsResponse);
    }
  }

  // Get the players stats after the user searches for a player
  async getPlayerStats(player: any) {
    const config = {
      method: 'get',
      url: `https://www.balldontlie.io/api/v1/season_averages?season=2020&player_ids[]=${player.id}`,
      headers: {}
    };

    try {
      let playerStatsResponse = await axios(config);
      playerStatsResponse = playerStatsResponse.data.data[0]
      console.log(playerStatsResponse)
      return playerStatsResponse;
    }
    catch (err) {
      console.error(err)
    }
  }
  async fillPlayerStats(stats: any) {
      this.player1Stats = {
        gamesPlayed: stats.games_played,
        averageMinutesPlayed: stats.min,
        averageFieldGoalsMade: stats.fgm,
        averageFieldGoalsAttempted: stats.fga,
        average3PointersMade: stats.fg3m,
        average3PointersAttempted: stats.fg3a,
        averageFreeThrowsMade: stats.ftm,
        averageFreeThrowsAttempted: stats.fta,
        averageOffensiveRebounds: stats.oreb,
        averageDefensiveRebounds: stats.dreb,
        averageRebounds: stats.reb,
        averageAssists: stats.ast,
        averageSteals: stats.stl,
        averageBlocks: stats.blk,
        averageTurnovers: stats.turnover,
        averagePersonalFouls: stats.pf,
        averagePoints: stats.pts,
        averageFieldGoalPercentage: stats.fg_pct * 100,
        average3PointPercentage: stats.fg3_pct * 100,
        averageFreeThrowPercentage: stats.ft_pct * 100
      }
      this.player2Stats = {
        gamesPlayed: stats.games_played,
        averageMinutesPlayed: stats.min,
        averageFieldGoalsMade: stats.fgm,
        averageFieldGoalsAttempted: stats.fga,
        average3PointersMade: stats.fg3m,
        average3PointersAttempted: stats.fg3a,
        averageFreeThrowsMade: stats.ftm,
        averageFreeThrowsAttempted: stats.fta,
        averageOffensiveRebounds: stats.oreb,
        averageDefensiveRebounds: stats.dreb,
        averageRebounds: stats.reb,
        averageAssists: stats.ast,
        averageSteals: stats.stl,
        averageBlocks: stats.blk,
        averageTurnovers: stats.turnover,
        averagePersonalFouls: stats.pf,
        averagePoints: stats.pts,
        averageFieldGoalPercentage: stats.fg_pct * 100,
        average3PointPercentage: stats.fg3_pct * 100,
        averageFreeThrowPercentage: stats.ft_pct * 100,
      }
  }

  constructor() { }

  ngOnChanges(): void {
    this.updatePlayerStats().catch(err => {console.log(err)})
  }

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
