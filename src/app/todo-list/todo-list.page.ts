import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
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

    searchBarValue = '';
    todoList: any[];
    filterStatus = 'All';
    sortFunction = (todo1, todo2): boolean => false;

    constructor(private router: Router, private authService: AuthService,
                private todoService: TodoService, private utilService: UtilService,
                private alertController: AlertController, private changeDetectorRef: ChangeDetectorRef,
                private ngZone: NgZone) {
    }

    ngOnInit() {
        this.todoList = [];
        this.getTodoList();
    }

    search(event) {
        this.searchBarValue = event.srcElement.value;
    }

    async getTodoList() {
        const loading = await this.utilService.createLoading();
        loading.present();
        TodoService.queryForTodoList()
            .onSnapshot(
                (querySnapshot) => {
                    this.todoList = [];
                    for (const doc of querySnapshot.docs) {
                        this.todoList.push({
                            data: {
                                id: doc.id,
                                userUid: doc.data().userUid,
                                title: doc.data().title,
                                description: doc.data().description,
                                date: doc.data().date,
                                difficulty: doc.data().difficulty,
                                status: doc.data().status
                            }
                        });
                    }
                    loading.dismiss();
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

    onFilter() {
        this.alertController.create({
            header: 'Filter options:',
            buttons: [{
                text: 'All',
                handler: () => {
                    this.filterStatus = 'All';
                    this.changeDetectorRef.detectChanges();
                }
            }, {
                text: 'Complete',
                handler: () => {
                    this.filterStatus = 'Complete';
                    this.changeDetectorRef.detectChanges();
                }
            }, {
                text: 'Incomplete',
                handler: () => {
                    this.filterStatus = 'Incomplete';
                    this.changeDetectorRef.detectChanges();
                }
            }]
        }).then((alert) => alert.present());
    }

    onSort() {
        this.alertController.create({
            header: 'Sort by:',
            buttons: [{
                text: 'Difficulty ascending',
                handler: () => {
                    this.sortFunction = (todo1, todo2): boolean => todo1.data.difficulty > todo2.data.difficulty;
                    this.changeDetectorRef.detectChanges();
                }
            }, {
                text: 'Difficulty descending',
                handler: () => {
                    this.sortFunction = (todo1, todo2): boolean => todo1.data.difficulty < todo2.data.difficulty;
                    this.changeDetectorRef.detectChanges();
                }
            }, {
                text: 'Date ascending',
                handler: () => {
                    this.sortFunction = (todo1, todo2): boolean => todo1.data.date > todo2.data.date;
                    this.changeDetectorRef.detectChanges();
                }
            }, {
                text: 'Date descending',
                handler: () => {
                    this.sortFunction = (todo1, todo2): boolean => todo1.data.date < todo2.data.date;
                    this.changeDetectorRef.detectChanges();
                }
            }, {
               text: 'Title ascending',
               handler: () => {
                   this.sortFunction = (todo1, todo2): boolean => todo1.data.title > todo2.data.title;
                   this.changeDetectorRef.detectChanges();
               }
            }, {
                text: 'Title descending',
                handler: () => {
                    this.sortFunction = (todo1, todo2): boolean => todo1.data.title < todo2.data.title;
                    this.changeDetectorRef.detectChanges();
                }
            }, {
                text: 'None',
                handler: () => {
                    this.sortFunction = (todo1, todo2): boolean => false;
                    this.changeDetectorRef.detectChanges();
                }
            }]
        }).then((alert) => alert.present());
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
        TodoService.deleteTodo(this.todoList[index].data.id)
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
        const todo = this.todoList[index];
        const id = todo.data.id;
        const title = todo.data.title;
        const description = todo.data.description;
        const date = todo.data.date;
        const difficulty = todo.data.difficulty;
        this.router.navigate([`/edit-todo/${id}/${title}/${description}/${date}/${difficulty}`]);
    }

    async onChangeStatus(index: number) {
        const status = this.todoList[index].data.status === 'Complete' ? 'Incomplete' : 'Complete';
        const loading = await this.utilService.createLoading();
        loading.present();
        TodoService.editTodo(this.todoList[index].data.id, {status})
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

    onAdd() {
        this.ngZone.run(() => this.router.navigateByUrl('/add-todo'));
    }

}
