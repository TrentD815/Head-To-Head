import {Component, Input, OnInit} from '@angular/core';
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

  // Get the dominant color of the players team logo to be used later for changing the background color
  async getDominantColorPlayer(player:PlayerProfile) {
     if (player.teamLogoSource != null) {
       const dominantColorPlayer = await getColorFromURL(player.teamLogoSource, 1)
       //console.log("Player colors: ", dominantColorPlayer);
       return dominantColorPlayer;
     }
     return null;
  }

  // Get the players profile after the user searches for a player
  async getPlayerProfile() {
    console.log("getting player profile")
    const config = {
      method: 'get',
      url: 'https://www.balldontlie.io/api/v1/players?search=Lebron%20James',
      headers: {}
    };
    try {
      let response = await axios(config);
      response = response.data.data[0];
      this.fillPlayerProfile(response);
    }
    catch (err) {
      console.error(err)
    }
  }

  // Take the returned player profile and autofill the data into their respective spots
  fillPlayerProfile(player:any){
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
  }

  convertPositionToFullName(positionShorthand: string) {
    switch (positionShorthand) {
      case 'F':
        return 'Forward'
        break;
      case 'C':
        return 'Center';
        break;
      default:
        return positionShorthand
        break;
    }
  }

  // Get the players stats after the user searches for a player
  async getStats() {
    console.log("getting stats");

    const config = {
      method: 'get',
      url: 'https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=237',
      headers: {}
    };

    try {
      let response = await axios(config);
      response = JSON.stringify(response.data)
      console.log(response)
    }
    catch (err) {
      console.error(err)
    }
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
