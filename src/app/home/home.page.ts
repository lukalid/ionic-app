import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Util } from '../util/util';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase';
import { UtilService } from '../util/util.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  showHeader: boolean;
  avatarUrl: string;

  constructor(private changeDetectorRef: ChangeDetectorRef, private utilService: UtilService) { }

  ngOnInit(): void {
    this.getNewAvatar();
    this.init();
  }

  private async init() {
    this.showHeader = false;
    const loading = await this.utilService.createLoading();
    loading.present();
    firebase.auth().onAuthStateChanged(() => {
      this.showHeader = true;
      this.changeDetectorRef.detectChanges();
      loading.dismiss();
    });
  }

  private getNewAvatar() {
    this.avatarUrl = Util.generateAvatarUrl();
  }

  isUserSignedIn() {
    return AuthService.isUserSignedIn();
  }

}
