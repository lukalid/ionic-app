import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '../util/util.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { TodoService } from '../todo-list/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.page.html',
  styleUrls: ['./edit-todo.page.scss'],
})
export class EditTodoPage implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private utilService: UtilService, private router: Router) { }

  ngOnInit() {
    this.form = this.createForm();
    this.populateForm();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      title: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      date: [null, Validators.compose([Validators.required])],
      difficulty: [null, Validators.compose([Validators.required])]
    });
  }

  private populateForm() {
    const title = this.route.snapshot.paramMap.get('title');
    const description = this.route.snapshot.paramMap.get('description');
    const date = this.route.snapshot.paramMap.get('date');
    const difficulty = this.route.snapshot.paramMap.get('difficulty');
    this.form.setValue({ title, description, date, difficulty });
  }

  async onEdit() {
    if (this.form.valid) {
      const title = this.form.value.title;
      const description = this.form.value.description;
      const date = this.form.value.date;
      const difficulty = this.form.value.difficulty;
      const loading = await this.utilService.createLoading();
      loading.present();
      TodoService.editTodo(this.route.snapshot.paramMap.get('id'), {title, description, date, difficulty})
          .then(
          () => {
            loading.dismiss();
            this.utilService.showToast('TO DO has been updated!', 'success');
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
