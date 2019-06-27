import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('avatarImage') avatarImage: ElementRef;
  showHeader: boolean;

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

  private async getNewAvatar() {
    const load = await this.utilService.createLoading('You finally figured it out...');
    load.present();
    const avatarImage = this.avatarImage.nativeElement;
    avatarImage.onload = this.changeAvatar.bind(this, load);
    avatarImage.src = Util.generateAvatarUrl();
  }

  isUserSignedIn() {
    return AuthService.isUserSignedIn();
  }

  changeAvatar(load) {
      Util.avatarColorChanged.next();
      load.dismiss();
  }

}
