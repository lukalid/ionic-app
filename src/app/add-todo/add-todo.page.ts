import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo-list/todo.service';
import { UtilService } from '../util/util.service';
import { AuthService } from '../auth/auth.service';
import { Router} from '@angular/router';
import {StatsService} from '../stats/stats.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage implements OnInit {

  form: FormGroup;
  minYear = new Date().getFullYear();
  maxYear = this.minYear + 5;

  constructor(private formBuilder: FormBuilder, private utilService: UtilService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      title: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      date: [null, Validators.compose([Validators.required])],
      difficulty: [5, Validators.compose([Validators.required])]
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
              StatsService.updateStats(this.form.value.date, this.form.value.difficulty, 0, 1);
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
