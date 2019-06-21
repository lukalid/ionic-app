import { Component, OnInit } from '@angular/core';
import { Util } from '../util/util';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  avatarUrl: string;
  avatarColor: string;

  constructor(private navController: NavController, private authService: AuthService) { }

  ngOnInit(): void {
    this.getNewAvatar();
    firebase.auth().onAuthStateChanged(() => {
      if (this.authService.isUserSignedIn()) {
        this.navController.navigateForward('/todo-list');
      } else {
        this.navController.navigateForward('/home');
      }
    });
  }

  private getNewAvatar() {
    this.avatarUrl = Util.generateAvatarUrl();
    this.avatarColor = Util.getAvatarColor();
  }

  isUserSignedIn() {
    return this.authService.isUserSignedIn();
  }

  onSignOut() {
    this.authService.signOut();
  }

}
