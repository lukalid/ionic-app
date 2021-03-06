import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase';

export class TodoService {

    constructor() { }

    static queryForTodoList() {
        const userUid = AuthService.getCurrentUserUid();
        return firebase.firestore().collection('todo-list')
            .where('userUid', '==', userUid);
    }

    static addTodo(todo: { title: string, description: string, date: Date, status: string, difficulty: number, userUid?: string }) {
        todo.userUid = AuthService.getCurrentUserUid();
        return firebase.firestore().collection('todo-list').add(todo);
    }

    static editTodo(id: string, data) {
        return firebase.firestore().collection('todo-list').doc(id).update(data);
    }

    static deleteTodo(id: string) {
        return firebase.firestore().collection('todo-list').doc(id).delete();
    }

    static getTodo(id: string) {
        return firebase.firestore().collection('todo-list').doc(id).get();
    }

}
