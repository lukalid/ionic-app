import { Component, OnInit } from '@angular/core';
import {Util} from '../util/util';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

  avatarColor: string;

  constructor(private navController: NavController) { }

  ngOnInit() {
    this.avatarColor = Util.getAvatarColor();
  }

  onBack() {
    this.navController.back();
  }

}
