import { Component, OnInit } from '@angular/core';
import { Util } from '../util/util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo-list/todo.service';
import { UtilService } from '../util/util.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private utilService: UtilService, private router: Router) { }

  ngOnInit() {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      title: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      date: [null, Validators.compose([Validators.required])],
      difficulty: [null, Validators.compose([Validators.required])]
    });
  }

  async onAdd() {
    if (this.form.valid) {
      const loading = await this.utilService.createLoading();
      loading.present();
      TodoService.addTodo({
          title: this.form.value.title,
          description: this.form.value.description,
          date: this.form.value.date,
          status: 'Incomplete',
          difficulty: this.form.value.difficulty
      }).then(
        () => {
              loading.dismiss();
              this.utilService.showToast('TO DO has been added!', 'success');
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
    } else {
        this.utilService.showToast('Please, populate all fields!', 'danger');
    }
  }

  onBack() {
    this.router.navigate(['/todo-list']);
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
