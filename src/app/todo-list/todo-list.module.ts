import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TodoListPage } from './todo-list.page';
import { IonicRatingModule } from 'ionic4-rating/dist';
import { ShortenPipe } from '../pipes/shorten.pipe';

const routes: Routes = [
  {
    path: '',
    component: TodoListPage
  }
];

@NgModule({
  imports: [
    IonicRatingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShortenPipe, TodoListPage]
})
export class TodoListPageModule {}
