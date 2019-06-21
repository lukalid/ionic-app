import { Component, OnInit } from '@angular/core';
import {Util} from '../util/util';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

  avatarColor: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.avatarColor = Util.getAvatarColor();
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
