import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UtilService} from '../util/util.service';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Injectable()
export class TodoService {

    constructor(private authService: AuthService, private utilService: UtilService, private router: Router) { }

    static queryForTodoList() {
        const userUid = AuthService.getCurrentUserUid();
        return firebase.firestore().collection('todo-list')
            .where('userUid', '==', userUid);
    }

    addTodo(todo: { title: string, description: string, date: Date, status: string, userUid?: string }) {
        todo.userUid = AuthService.getCurrentUserUid();
        firebase.firestore().collection('todo-list').add(todo)
            .then(
                () => {
                    this.utilService.showToast('TO DO has been added!', 'success');
                    this.router.navigate(['/todo-list']);
                },
                (error) => this.utilService.showToast(error, 'danger')
            )
            .catch((error) => this.utilService.showToast(error, 'danger'));
    }

    editTodo(todoList: any[], index: number, data) {
        return firebase.firestore().collection('todo-list').doc(todoList[index].id).update(data)
            .then(
                () => {
                    this.utilService.showToast('TO DO has been updated!', 'success');
                    todoList[index].data().status = status;
                },
                (error) => this.utilService.showToast(error, 'danger')
            )
            .catch((error) => this.utilService.showToast(error, 'danger'));
    }

    deleteTodo(todoList: any[], index: number) {
        firebase.firestore().collection('todo-list').doc(todoList[index].id).delete()
            .then(
                () => {
                    this.utilService.showToast('TO DO has been deleted!', 'success');
                    todoList.splice(index, 1);
                },
                (error) => this.utilService.showToast(error, 'danger')
            )
            .catch((error) => this.utilService.showToast(error, 'danger'));
    }

}
