import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, filter} from 'rxjs/operators';
import { getColorFromURL } from 'color-thief-node';
import { PlayerProfile } from '../player-profile';
// @ts-ignore
import { playerListImport } from 'src/app/player-profile/playerList.js';
const axios = require('axios');

type Player = string;
const playerList: Player[] = playerListImport;

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
  @Output() retrievedPlayerProfileEvent = new EventEmitter<any>();

  async playerSearch(value:string) {
    this.searchedPlayer = value;
    const profile = await this.getPlayerProfile(this.searchedPlayer);
    profile.identity = this.playerIdentity
    this.retrievedPlayerProfileEvent.emit(profile);
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
      //console.log(playerProfileResponse)
      return playerProfileResponse;
    }
    catch (err) {
      console.error(err)
      return false;
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
      height: player.height_feet ? player.height_feet + "' " + player.height_inches + '"' : "Unknown",
      weight: player.weight_pounds ? player.weight_pounds + " lbs" : "Unknown"
    }
  }

  // Returned positions from API are single letter so convert them to full name for better user experience
  convertPositionToFullName(positionShorthand: string) {
      switch (positionShorthand) {
        case 'F':
          return 'Forward'
        case 'C':
          return 'Center';
        case 'F-C':
          return 'Forward-Center';
        case 'G':
          return 'Guard';
        case 'F-G':
          return 'Forward-Guard'
        default:
          return positionShorthand ? positionShorthand : "Unknown"
      }
  }

  // Sort through player list based on inputted value and return a list of results
  autoCompletePlayer: (text$: Observable<string>) => Observable<Player[]> = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => playerList.filter(player => new RegExp(term, 'mi').test(player)).slice(0, 10))
  )

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

  //Initialize the default players
  ngOnInit(): void {
    if (this.playerIdentity === "1") {
      this.player = {
        name: "Player 1",
        team: "Team",
        weight: "-",
        height: `-`,
        position: "Position",
        profilePicSource: "/assets/Headshots/NoPlayerDefault.png",
        teamLogoSource: "/assets/Logos/BasketballDefault.png",
      }
    } else {
      this.player = {
        name: "Player 2",
        team: "Team",
        weight: "-",
        height: `-`,
        position: "Position",
        profilePicSource: "assets/Headshots/NoPlayerDefault.png",
        teamLogoSource: "/assets/Logos/BasketballDefault.png",
      }
    }
  }
}
