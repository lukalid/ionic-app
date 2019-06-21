import { Component, OnInit } from '@angular/core';
import {Util} from '../util/util';
import {NavController} from '@ionic/angular';
import {TodoService} from './todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

  avatarColor: string;
  todoList: any[];

  constructor(private todoService: TodoService, private navController: NavController) { }

  ngOnInit() {
    this.avatarColor = Util.getAvatarColor();
    const query = this.todoService.queryForTodoList();
    if (query != null) {
      query.onSnapshot((querySnapshot) => this.todoList = querySnapshot.docs);
    }
  }

  onBack() {
    this.navController.back();
  }

  onDelete(index: number) {
    console.log('On delete');
  }

  onEdit(index: number) {
    console.log('On edit');
  }

  onCheck(index: number) {
    console.log('On check');
  }

}
