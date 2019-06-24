import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TodoListPage } from './todo-list.page';
import { IonicRatingModule } from 'ionic4-rating/dist';
import { ShortenPipe } from '../pipes/shorten.pipe';
import { SharedModule } from '../shared/shared.module';
import { FilterPipe } from '../pipes/filter.pipe';
import { SortPipe } from '../pipes/sort.pipe';
import { SearchPipe } from '../pipes/search.pipe';

const routes: Routes = [
  {
    path: '',
    component: TodoListPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    IonicRatingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchPipe, SortPipe, FilterPipe, ShortenPipe, TodoListPage]
})
export class TodoListPageModule {}
