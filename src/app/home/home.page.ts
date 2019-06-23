import { Component, OnInit } from '@angular/core';
import { Util } from '../util/util';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UtilService } from '../util/util.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  avatarUrl: string;

  constructor(private router: Router, private utilService: UtilService) { }

  ngOnInit(): void {
    this.getNewAvatar();
    firebase.auth().onAuthStateChanged(() => {
      if (AuthService.isUserSignedIn()) {
        this.router.navigate(['/todo-list']);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  private getNewAvatar() {
    this.avatarUrl = Util.generateAvatarUrl();
  }

  isUserSignedIn() {
    return AuthService.isUserSignedIn();
  }

  onSignOut() {
    AuthService.signOut()
        .then(
            () => {
              this.utilService.showToast('Sign out successful!', 'success');
            },
            (error) => this.utilService.showToast(error, 'danger')
        )
        .catch((error) => this.utilService.showToast(error, 'danger'));
  }

}
