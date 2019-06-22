import {Component, OnInit} from '@angular/core';
import {Util} from '../util/util';
import {TodoService} from './todo.service';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.page.html',
    styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

    avatarColor: string;
    todoList: any[];

    constructor(private router: Router, private authService: AuthService,
                private todoService: TodoService) {
    }

    ngOnInit() {
        this.avatarColor = Util.getAvatarColor();
        this.getTodoList();
    }

    getTodoList() {
        TodoService.queryForTodoList()
            .onSnapshot((querySnapshot) => this.todoList = querySnapshot.docs);
    }

    onBack() {
        this.router.navigate(['/home']);
    }

    onDelete(index: number) {
        this.todoService.deleteTodo(this.todoList, index);
    }

    onEdit(todo: {}) {
        console.log('On edit');
    }

    onChangeStatus(index: number) {
        const status = this.todoList[index].data().status === 'Complete' ? 'Incomplete' : 'Complete';
        this.todoService.editTodo(this.todoList, index, {status});
    }

    isUserSignedIn() {
        return AuthService.isUserSignedIn();
    }

    onSignOut() {
        this.authService.signOut();
    }

}
