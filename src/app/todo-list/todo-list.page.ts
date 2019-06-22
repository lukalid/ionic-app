import { Component, OnInit } from '@angular/core';
import { Util } from '../util/util';
import { TodoService } from './todo.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UtilService } from '../util/util.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.page.html',
    styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

    avatarColor: string;
    todoList: any[];

    constructor(private router: Router, private authService: AuthService,
                private todoService: TodoService, private utilService: UtilService) {
    }

    ngOnInit() {
        this.avatarColor = Util.getAvatarColor();
        this.getTodoList();
    }

    getTodoList() {
        TodoService.queryForTodoList()
            .onSnapshot(
                (querySnapshot) => this.todoList = querySnapshot.docs,
                (error) => this.utilService.showToast(error.message, 'danger')
            );
    }

    onBack() {
        this.router.navigate(['/home']);
    }

    onDelete(index: number) {
        TodoService.deleteTodo(this.todoList[index].id)
            .then(
                () => {
                    this.utilService.showToast('TO DO has been deleted!', 'success');
                },
                (error) => this.utilService.showToast(error, 'danger')
            )
            .catch((error) => this.utilService.showToast(error, 'danger'));;
    }

    onEdit(index: number) {
        const document = this.todoList[index];
        const id = document.id;
        const title = document.data().title;
        const description = document.data().description;
        const date = document.data().date;
        this.router.navigate([`/edit-todo/${id}/${title}/${description}/${date}`]);
    }

    onChangeStatus(index: number) {
        const status = this.todoList[index].data().status === 'Complete' ? 'Incomplete' : 'Complete';
        TodoService.editTodo(this.todoList[index].id, {status})
            .then(
                () => {
                    this.utilService.showToast('TO DO has been updated!', 'success');
                    this.todoList[index].data().status = status;
                },
                (error) => this.utilService.showToast(error, 'danger')
            )
            .catch((error) => this.utilService.showToast(error, 'danger'));
    }

    isUserSignedIn() {
        return AuthService.isUserSignedIn();
    }

    onSignOut() {
        AuthService.signOut()
            .then(
                () => {
                    this.utilService.showToast('Sign out successful!', 'success');
                    this.onBack();
                },
                (error) => this.utilService.showToast(error, 'danger')
            )
            .catch((error) => this.utilService.showToast(error, 'danger'));
    }

}
