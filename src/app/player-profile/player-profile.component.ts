import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, last, map} from 'rxjs/operators';
import { getColorFromURL } from 'color-thief-node';
import { PlayerProfile } from '../player-profile';
// @ts-ignore
import { playerListImport } from 'src/app/player-profile/playerList.js';
const axios = require('axios');
import { environment } from 'src/environments/environment';

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
  @Output() retrievedPlayerProfileEvent = new EventEmitter<any>();
  player ?: PlayerProfile;
  searchedPlayer ?: string;
  seasonTypes ?: string[];
  seasonType ?: string;
  years ?: string[];
  year ?: string;

  async playerSearch(value:string) {
    this.searchedPlayer = value;
    const profile = await this.getPlayerProfile(this.searchedPlayer);
    profile.identity = this.playerIdentity;
    profile.year = this.year;
    profile.seasonType = this.seasonType;
    this.retrievedPlayerProfileEvent.emit(profile);
  }

  // Get the players profile after the user searches for a player
  async getPlayerProfile(searchedPlayer : string) {
    const splitName = searchedPlayer.split(' ')
    const firstName = splitName[0]
    const lastName = splitName[1]
    const config = {
      method: 'get',
      url: `https://api.balldontlie.io/v1/players?first_name=${firstName}&last_name=${lastName}`,
      headers: { 'Authorization': environment.API_KEY }
    };
    try {
      let playerProfileResponse = await axios(config);
      playerProfileResponse = playerProfileResponse.data.data[0];
      await this.fillPlayerProfile(playerProfileResponse);
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
    console.log(player.last_name)
    let lastNameFormatted = player.last_name.split(" ").join("")
    console.log(lastNameFormatted)
    lastNameFormatted = lastNameFormatted.replace(/\./g, "");
    console.log(lastNameFormatted)

    this.player = {
      profilePicSource: `assets/Headshots/${player.first_name}${lastNameFormatted}.png`,
      teamLogoSource: `/assets/Logos/${formattedTeamLogoSource}.svg`,
      name: player.first_name + " " + player.last_name,
      team: player.team.full_name,
      position: this.convertPositionToFullName(player.position),
      height: player.height ? player.height : "Unknown",
      weight: player.weight ? player.weight + " lbs" : "Unknown"
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

  typeSelection(typeSelected: string) {
    this.seasonType = typeSelected;
    this.year = this.isCareerChosen()  ? "N/A" : "Year";
  }
  yearSelection(yearSelected: string) {
      this.year = `20${yearSelected.substr(0, 2)}`;
  }
  isCareerChosen() {
    return this.seasonType?.includes("Career");
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
    this.seasonTypes = ["Regular", "Playoffs", "Career", "Career Regular", "Career Playoffs"]
    this.seasonType = "Regular";
    this.years = ["23-24","22-23","21-22","20-21","19-20","18-19","17-18"]
    this.year = "2023"
  }
}
