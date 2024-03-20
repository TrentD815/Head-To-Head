import { Component, Input, OnInit } from '@angular/core';
import { PlayerStats } from "../player-stats";
import axios from 'axios'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss', '../app.component.scss']
})
export class PlayerStatsComponent implements OnInit {
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
    let regular = `https://api.balldontlie.io/v1/season_averages?season=${player.year}&player_ids[]=${player.id}`;
    let playoffs = `https://api.balldontlie.io/v1/stats?seasons[]=${player.year}&player_ids[]=${player.id}&postseason=true`;
    const config = {
      method: 'get',
      url: player.seasonType === "Regular" ? regular : playoffs,
      headers: { 'Authorization': environment.API_KEY }
    };

    try {
      let playerStatsResponse = await axios.request(config);
      playerStatsResponse = player.seasonType === "Regular" ? playerStatsResponse.data.data[0] : playerStatsResponse.data.data

      return playerStatsResponse;
    }
    catch (err) {
      console.error(err)
      return {}
    }
  }

  // Take returned stat response and update the UI with the corresponding fields
  async fillPlayerStats(stats: any, player: any) {
    if (player.seasonType === "Playoffs") {
      stats = this.calculatePlayoffAverages(stats);
      console.log("After" + JSON.stringify(stats))
    }
    if (player.identity === "1") {
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
        averageFieldGoalPercentage: player.seasonType === "Regular" ? stats.fg_pct * 100 : stats.fg_pct,  //Fix for inconsistent api
        average3PointPercentage: player.seasonType === "Regular" ? stats.fg3_pct * 100 : stats.fg3_pct,
        averageFreeThrowPercentage: player.seasonType === "Regular" ? stats.ft_pct * 100 : stats.ft_pct,
        name: `${player.first_name} ${player.last_name}`
      }
    }
    else {
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
        averageFieldGoalPercentage: player.seasonType === "Regular" ? stats.fg_pct * 100 : stats.fg_pct,  //Fix for inconsistent api
        average3PointPercentage: player.seasonType === "Regular" ? stats.fg3_pct * 100 : stats.fg3_pct,
        averageFreeThrowPercentage: player.seasonType === "Regular" ? stats.ft_pct * 100 : stats.ft_pct,
        name: `${player.first_name} ${player.last_name}`
      }
    }
  }

  // Check to allow some html elements to be piped without error
  isNumber(val ?: number | string): boolean { return typeof val === 'number'; }

  // There's no playoff averages endpoint so get the stats of the individual games and manually calculate
  calculatePlayoffAverages(playoffStats : any) {
    const gamesPlayed = playoffStats.length;

    let playoffAverages = {
      games_played : gamesPlayed, min: 0, fgm: 0, fga: 0, fg3m: 0, fg3a: 0, ftm: 0, fta: 0, oreb: 0, dreb: 0,
      reb: 0, ast: 0, stl: 0, blk: 0, turnover: 0, pf: 0, pts: 0, fg_pct: 0, fg3_pct: 0, ft_pct: 0
    }
    // Return 0's if player was not in the playoffs for picked season
    if (gamesPlayed === 0) {
      return playoffAverages
    }
    // Gather totals for all stats
    playoffStats.forEach((game : any) => {
      for (let [key, value] of Object.entries(game)) {
        if (key === "min") {
          value = this.convertMinutes(value);
        }
        // @ts-ignore
        playoffAverages[key] += value;
      }
    })
    // Calculate average for each stat
    for (let [key, value] of Object.entries(playoffAverages)) {
      value = value / gamesPlayed;
      value = value.toFixed(2);
      // @ts-ignore
      playoffAverages[key] = value;
    }
    playoffAverages.games_played = gamesPlayed
    return playoffAverages;
  }
  convertMinutes(minutesPlayed: any) {
    minutesPlayed = minutesPlayed.replace(":", ".")
    minutesPlayed = parseInt(minutesPlayed);
    return minutesPlayed;
  }
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
        plusMinus: "-",
        name: "-"
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
        plusMinus: "-",
        name: "-"
      }
  }
}
