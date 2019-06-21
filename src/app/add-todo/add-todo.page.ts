import { Component, OnInit } from '@angular/core';
import {Util} from '../util/util';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TodoService} from '../todo-list/todo.service';
import {UtilService} from '../util/util.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage implements OnInit {

  form: FormGroup;
  avatarColor: string;

  constructor(private todoService: TodoService, private formBuilder: FormBuilder,
              private utilService: UtilService, private navController: NavController) { }

  ngOnInit() {
    this.avatarColor = Util.getAvatarColor();
    this.form = this.createForm();
  }

  onBack() {
      this.navController.back();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      title: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      date: [null, Validators.compose([Validators.required])]
    });
  }

  onAdd() {
    if (this.form.valid) {
      this.todoService.addTodo({
          title: this.form.value.title,
          description: this.form.value.description,
          date: this.form.value.date
      });
    } else {
        this.utilService.showToast('Please, populate all fields!', 'danger');
    }
  }

}
