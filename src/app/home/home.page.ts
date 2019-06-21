import { Component, OnInit } from '@angular/core';
import { Util } from '../util/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  avatarUrl: string;
  avatarColor: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getNewAvatar();
  }

  private getNewAvatar() {
    this.avatarColor = Util.generateRandomColor();
    this.avatarUrl = Util.generateAvatarUrl(this.avatarColor.substring(1));
  }

  onLogin() {
    this.router.navigate(['/signin/' + this.avatarColor]);
  }

  onRegister() {
    this.router.navigate(['/signup/' + this.avatarColor]);
  }

}
