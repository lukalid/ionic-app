import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase';

@Injectable()
export class TodoService {

    constructor() { }

    static queryForTodoList() {
        const userUid = AuthService.getCurrentUserUid();
        return firebase.firestore().collection('todo-list')
            .where('userUid', '==', userUid);
    }

    static addTodo(todo: { title: string, description: string, date: Date, status: string, userUid?: string }) {
        todo.userUid = AuthService.getCurrentUserUid();
        return firebase.firestore().collection('todo-list').add(todo);
    }

    static editTodo(document: firebase.firestore.QueryDocumentSnapshot, data) {
        return firebase.firestore().collection('todo-list').doc(document.id).update(data);
    }

    static deleteTodo(document: firebase.firestore.QueryDocumentSnapshot) {
        return firebase.firestore().collection('todo-list').doc(document.id).delete();
    }

}
