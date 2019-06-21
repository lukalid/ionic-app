import { Component, OnInit } from '@angular/core';
import { Util } from '../util/util';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  avatarUrl: string;
  avatarColor: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getNewAvatar();
    this.redirectIfLoggedIn();
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

  redirectIfLoggedIn() {
    firebase.auth().onAuthStateChanged(() => {
      if (this.authService.isUserSignedIn()) {
        this.router.navigate(['/todo-list']);
      }
    });
  }

}
