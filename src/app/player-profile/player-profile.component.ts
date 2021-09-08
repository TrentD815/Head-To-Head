import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { getColorFromURL } from 'color-thief-node';
import { PlayerProfile } from '../player-profile';
const bent = require('bent')
const axios = require('axios');

@Component({
  selector: 'player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss', '../app.component.scss']
})
export class PlayerProfileComponent implements OnInit {
  @Input() playerIdentity ?: string;
  @Input() isDarkTheme ?: boolean;
  player ?: PlayerProfile;
  searchedPlayer ?: string;
  lastSearchedPlayer ?: string;
  @Output() retrievedPlayerStats = new EventEmitter<any>();

  async playerSearch(value:string) {
    this.searchedPlayer = value;
    await this.getPlayerProfile(this.searchedPlayer)
  }

  // Get the players profile after the user searches for a player
  async getPlayerProfile(searchedPlayer : string) {
    const config = {
      method: 'get',
      url: `https://www.balldontlie.io/api/v1/players?search=${searchedPlayer}`,
      headers: {}
    };
    try {
      let playerProfileResponse = await axios(config);
      playerProfileResponse = playerProfileResponse.data.data[0];
      await this.fillPlayerProfile(playerProfileResponse);
      console.log(playerProfileResponse)
    }
    catch (err) {
      console.error(err)
    }
  }

  // Take the returned player profile and autofill the data into their respective spots
  async fillPlayerProfile(player:any) {
    const teamLogoFullName = player.team.full_name;
    const formattedTeamLogoSource = teamLogoFullName.split(" ").join("");
    this.player = {
      profilePicSource: `assets/Headshots/${player.first_name}${player.last_name}.png`,
      teamLogoSource: `/assets/Logos/${formattedTeamLogoSource}.svg`,
      name: player.first_name + " " + player.last_name,
      team: player.team.full_name,
      position: this.convertPositionToFullName(player.position),
      height: player.height_feet + "' " + player.height_inches + '"',
      weight: player.weight_pounds
    }

    const playerStatsResponse = await this.getPlayerStats(player);
    this.retrievedPlayerStats.emit(playerStatsResponse)
  }

  // Returned positions from API are single letter so convert them to full name for better user experience
  convertPositionToFullName(positionShorthand: string) {
      switch (positionShorthand) {
        case 'F':
          return 'Forward'
        case 'C':
          return 'Center';
        case 'C-F':
          return 'Forward-Center';
        case 'G':
          return 'Guard';
        case 'F-G':
          return 'Forward-Guard'
        default:
          return positionShorthand
      }
  }

  // Get the players stats after the user searches for a player
  async getPlayerStats(player: any) {
    const config = {
      method: 'get',
      url: `https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=${player.id}`,
      headers: {}
    };

    try {
      let playerStatsResponse = await axios(config);
      playerStatsResponse = JSON.stringify(playerStatsResponse.data)
      console.log(playerStatsResponse)
      return playerStatsResponse;
    }
    catch (err) {
      console.error(err)
    }
  }


  // Get the dominant color of the players team logo to be used later for changing the background color
  async getDominantColorPlayer(player:PlayerProfile) {
    if (player.teamLogoSource != null) {
      const dominantColorPlayer = await getColorFromURL(player.teamLogoSource, 1)
      //console.log("Player colors: ", dominantColorPlayer);
      return dominantColorPlayer;
    }
    return null;
  }
  constructor() {}

  ngOnInit(): void {
    if (this.playerIdentity === "1") {
      this.player = {
        name: "Lebron James",
        team: "Los Angeles Lakers",
        weight: 250,
        height: "6' 9",
        position: "Forward",
        profilePicSource: "assets/Headshots/LebronJames.png",
        teamLogoSource: "/assets/Logos/LosAngelesLakers.svg",
        number: 6
      }
    } else {
      this.player = {
        name: "Giannis Antetokounmpo",
        team: "Milwaukee Bucks",
        weight: 242,
        height: "6' 11",
        position: "Forward",
        profilePicSource: "assets/Headshots/GiannisAntetokounmpo.png",
        teamLogoSource: "/assets/Logos/MilwaukeeBucks.svg",
        number: 34
      }
    }
    //this.getDominantColorPlayer(this.player).then(r => console.log(r))
  }
}
