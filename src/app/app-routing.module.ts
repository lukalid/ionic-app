import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' },
  { path: 'todo-list', loadChildren: './todo-list/todo-list.module#TodoListPageModule' },
  { path: 'add-todo', loadChildren: './add-todo/add-todo.module#AddTodoPageModule' },
  { path: 'edit-todo/:id/:title/:description/:date/:difficulty', loadChildren: './edit-todo/edit-todo.module#EditTodoPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
