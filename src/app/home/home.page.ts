import { Component, OnInit } from '@angular/core';
import { Util } from '../util/util';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  avatarUrl: string;
  avatarColor: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getNewAvatar();
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
