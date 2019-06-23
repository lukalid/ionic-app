import { Component, OnInit } from '@angular/core';
import { Util } from '../util/util';
import { TodoService } from './todo.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UtilService } from '../util/util.service';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.page.html',
    styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

    avatarColor: string;
    todoList: any[];

    constructor(private router: Router, private authService: AuthService,
                private todoService: TodoService, private utilService: UtilService,
                private alertController: AlertController) {
    }

    ngOnInit() {
        this.avatarColor = Util.getAvatarColor();
        this.getTodoList();
    }

    async getTodoList() {
        const loading = await this.utilService.createLoading();
        loading.present();
        TodoService.queryForTodoList()
            .onSnapshot(
                (querySnapshot) => {
                    loading.dismiss();
                    this.todoList = querySnapshot.docs;
                },
                (error) => {
                    loading.dismiss();
                    this.utilService.showToast(error.message, 'danger');
                }
            );
    }

    onBack() {
        this.router.navigate(['/home']);
    }

    async onDelete(index: number) {
        const alert = await this.alertController.create({
            header: 'Are you sure?',
            buttons: [{
                text: 'Yes',
                handler: () => {
                    this.deleteTodo(index);
                }
            }, {
                text: 'No',
                handler: () => { }
            }]
        });
        alert.present();
    }

    private async deleteTodo(index: number) {
        const loading = await this.utilService.createLoading();
        loading.present();
        TodoService.deleteTodo(this.todoList[index].id)
            .then(
                () => {
                    loading.dismiss();
                    this.utilService.showToast('TO DO has been deleted!', 'success');
                },
                (error) => {
                    loading.dismiss();
                    this.utilService.showToast(error, 'danger');
                }
            )
            .catch((error) => {
                loading.dismiss();
                this.utilService.showToast(error, 'danger');
            });
    }

    onEdit(index: number) {
        const document = this.todoList[index];
        const id = document.id;
        const title = document.data().title;
        const description = document.data().description;
        const date = document.data().date;
        const difficulty = document.data().difficulty;
        this.router.navigate([`/edit-todo/${id}/${title}/${description}/${date}/${difficulty}`]);
    }

    async onChangeStatus(index: number) {
        const status = this.todoList[index].data().status === 'Complete' ? 'Incomplete' : 'Complete';
        const loading = await this.utilService.createLoading();
        loading.present();
        TodoService.editTodo(this.todoList[index].id, {status})
            .then(
                () => {
                    loading.dismiss();
                    this.utilService.showToast('TO DO has been updated!', 'success');
                },
                (error) => {
                    loading.dismiss();
                    this.utilService.showToast(error, 'danger');
                }
            )
            .catch((error) => {
                loading.dismiss();
                this.utilService.showToast(error, 'danger');
            });
    }

    isUserSignedIn() {
        return AuthService.isUserSignedIn();
    }

    async onSignOut() {
        const loading = await this.utilService.createLoading();
        loading.present();
        AuthService.signOut()
            .then(
                () => {
                    loading.dismiss();
                    this.utilService.showToast('Sign out successful!', 'success');
                    this.onBack();
                },
                (error) => {
                    loading.dismiss();
                    this.utilService.showToast(error, 'danger');
                }
            )
            .catch((error) => {
                loading.dismiss();
                this.utilService.showToast(error, 'danger');
            });
    }

}
