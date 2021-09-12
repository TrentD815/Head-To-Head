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

  // Initial function to start updating player stats
  async updatePlayerStats () {
    if (this.playerProfile) {
      const playerStatsResponse = await this.getPlayerStats(this.playerProfile);
      await this.fillPlayerStats(playerStatsResponse, this.playerProfile);
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

  // Take returned stat response and update the UI with the corresponding fields
  async fillPlayerStats(stats: any, player: any) {
    //TODO: List what season the stats are for somewhere
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

  // Check to allow some html elements to be piped without error
  isNumber(val ?: number | string): boolean { return typeof val === 'number'; }

  constructor() { }

  // Run update stats every time there's an update to the profile
  ngOnChanges(): void {
    this.updatePlayerStats().catch(err => {console.log(err)})
  }

  // Initialize the stat board with empty values
  ngOnInit(): void {
      this.player1Stats = {
        gamesPlayed: "-",
        averageMinutesPlayed: "-",
        averagePoints: "-",
        averageAssists: "-",
        averageRebounds: "-",
        averageBlocks: "-",
        averageSteals: "-",
        averageFieldGoalsMade: "-",
        averageFieldGoalsAttempted: "-",
        averageFieldGoalPercentage: "-",
        average3PointersMade: "-",
        average3PointersAttempted: "-",
        average3PointPercentage: "-",
        averageFreeThrowsMade: "-",
        averageFreeThrowsAttempted: "-",
        averageFreeThrowPercentage: "-",
        averageOffensiveRebounds: "-",
        averageDefensiveRebounds: "-",
        averageTurnovers: "-",
        averagePersonalFouls: "-",
        plusMinus: "-"
      }
      this.player2Stats = {
        gamesPlayed: "-",
        averageMinutesPlayed: "-",
        averagePoints: "-",
        averageAssists: "-",
        averageRebounds: "-",
        averageBlocks: "-",
        averageSteals: "-",
        averageFieldGoalsMade: "-",
        averageFieldGoalsAttempted: "-",
        averageFieldGoalPercentage: "-",
        average3PointersMade: "-",
        average3PointersAttempted: "-",
        average3PointPercentage: "-",
        averageFreeThrowsMade: "-",
        averageFreeThrowsAttempted: "-",
        averageFreeThrowPercentage: "-",
        averageOffensiveRebounds: "-",
        averageDefensiveRebounds: "-",
        averageTurnovers: "-",
        averagePersonalFouls: "-",
        plusMinus: "-"
      }
  }
}
