import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import * as firebase from 'firebase';
import {UtilService} from '../util/util.service';
import {NavController} from '@ionic/angular';

@Injectable()
export class TodoService {

    constructor(private authService: AuthService, private utilService: UtilService, private navController: NavController) { }

    addTodo(todo: {title: string, description: string, date: Date, userUid?: string}) {
        if (this.authService.isUserSignedIn()) {
            todo.userUid = this.authService.getCurrentUserUid();
            firebase.firestore().collection('todo-list').add(todo)
                .then(
                    () => {
                        this.navController.back();
                        this.utilService.showToast('TO DO has been added!', 'success');
                    },
                    (error) => this.utilService.showToast(error, 'danger')
                )
                .catch((error) => this.utilService.showToast(error, 'danger'));
        }
    }

    queryForTodoList() {
        if (this.authService.isUserSignedIn()) {
            const userUid = this.authService.getCurrentUserUid();
            return firebase.firestore().collection('todo-list')
                .where('userUid', '==', userUid);
        }
        return null;
    }

}
