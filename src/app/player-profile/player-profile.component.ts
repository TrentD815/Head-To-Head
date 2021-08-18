import {Component, Input, OnInit} from '@angular/core';
import { getColorFromURL } from 'color-thief-node';
import { PlayerProfile } from '../player-profile';

@Component({
  selector: 'player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss', '../app.component.scss']
})
export class PlayerProfileComponent implements OnInit {
  @Input() player ?: number;
  player1 : PlayerProfile = {
    name: "Lebron James",
    team: "Los Angeles Lakers",
    weight: 240,
    height: "6' 8",
    position: "Forward",
    profilePicSource: "assets/LebronJames.png",
    teamLogoSource: "/assets/Logos/LosAngelesLakers.svg"
  }
  player2 : PlayerProfile = {
    name: "Giannis Antetokounmpo",
    team: "Milwaukee Bucks",
    weight: 210,
    height: "6' 9",
    position: "Forward",
    profilePicSource: "assets/GiannisAntetokounmpo.png",
    teamLogoSource: "/assets/Logos/MilwaukeeBucks.svg"
  }

  // Get the dominant color of the players team logo to be used later for changing the background color
 async getDominantColorPlayer1() {
   if (this.player1.teamLogoSource != null) {
     const dominantColorPlayer1 = await getColorFromURL(this.player1.teamLogoSource,1)
     console.log("Player 1 colors: ", dominantColorPlayer1);
     return dominantColorPlayer1;
   }
   return null;
 }
 async getDominantColorPlayer2() {
   if (this.player2.teamLogoSource != null) {
     const dominantColorPlayer2 = await getColorFromURL(this.player2.teamLogoSource, 1)
     console.log("Player 2 colors: ", dominantColorPlayer2);
     return dominantColorPlayer2;
   }
   return null
 }

  constructor() {
    // if (this.player === 1) {
    //   let player : PlayerProfile = {
    //     name: "Lebron James",
    //     team: "Los Angeles Lakers",
    //     weight: 240,
    //     height: "6' 8",
    //     position: "Forward",
    //     profilePicSource: "assets/LebronJames.png",
    //     teamLogoSource: "/assets/Logos/LosAngelesLakers.svg"
    //   }
    // }
    // else {
    //   let player : PlayerProfile = {
    //     name: "Giannis Antetokounmpo",
    //     team: "Milwaukee Bucks",
    //     weight: 210,
    //     height: "6' 9",
    //     position: "Forward",
    //     profilePicSource: "assets/GiannisAntetokounmpo.png",
    //     teamLogoSource: "/assets/Logos/MilwaukeeBucks.svg"
    //   }
    // }
  }

  ngOnInit(): void {
    this.getDominantColorPlayer1().then(r => console.log(r))
    this.getDominantColorPlayer2().then(r => console.log(r))
  }
}
