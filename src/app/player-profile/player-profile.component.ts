import {Component, Input, OnInit} from '@angular/core';
import { getColorFromURL } from 'color-thief-node';
import { PlayerProfile } from '../player-profile';

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
    this.getDominantColorPlayer(this.player).then(r => console.log(r))
  }
}
