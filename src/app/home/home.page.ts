import { Component, OnInit } from '@angular/core';
import { Util } from '../util/util';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  avatarUrl: string;
  avatarColor: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getNewAvatar();
  }

  private getNewAvatar() {
    this.avatarColor = Util.generateRandomColor();
    this.avatarUrl = Util.generateAvatarUrl(this.avatarColor.substring(1));
  }

  onSignIn() {
    this.router.navigate(['/signin/' + this.avatarColor]);
  }

  onSignUp() {
    this.router.navigate(['/signup/' + this.avatarColor]);
  }

  isUserSignedIn() {
    return this.authService.isUserSignedIn();
  }

  onSignOut() {
    this.authService.signOut();
  }

}
