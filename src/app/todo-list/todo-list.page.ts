import { Component, OnInit } from '@angular/core';
import { Util } from '../util/util';
import { TodoService } from './todo.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

  avatarColor: string;
  todoList: any[];

  constructor(private router: Router, private authService: AuthService,
              private todoService: TodoService) { }

  ngOnInit() {
    this.avatarColor = Util.getAvatarColor();
    const query = this.todoService.queryForTodoList();
    if (query != null) {
      query.onSnapshot((querySnapshot) => this.todoList = querySnapshot.docs);
    }
  }

  onBack() {
    this.router.navigate(['/home']);
  }

  onDelete(todo: {}) {
    console.log('On delete');
  }

  onEdit(todo: {}) {
    console.log('On edit');
  }

  onCheck(todo: {}) {
    console.log('On check');
  }

  isUserSignedIn() {
    return this.authService.isUserSignedIn();
  }

  onSignOut() {
    this.authService.signOut();
  }

}
