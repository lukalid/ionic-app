import {Component, OnInit} from '@angular/core';
import {Util} from '../util/util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  avatarUrl: string;
  headerFooterColor: string;

  constructor() {}

  ngOnInit(): void {
    this.headerFooterColor = Util.generateRandomColor();
    this.avatarUrl = Util.generateAvatarUrl(this.headerFooterColor);
  }

    getHeaderFooterColor() {
      return '#' + this.headerFooterColor;
    }

}
