import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditTodoPage } from './edit-todo.page';
import { IonicRatingModule } from 'ionic4-rating/dist';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: EditTodoPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    IonicRatingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [EditTodoPage]
})
export class EditTodoPageModule {}
