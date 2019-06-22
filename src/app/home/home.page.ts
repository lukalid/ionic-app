import { Component, OnInit } from '@angular/core';
import { Util } from '../util/util';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

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
    firebase.auth().onAuthStateChanged(() => {
      if (this.authService.isUserSignedIn()) {
        this.router.navigate(['/todo-list']);
      } else {
        this.router.navigate(['/home']);
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
    this.router.navigate(['/home']);
  }

}
