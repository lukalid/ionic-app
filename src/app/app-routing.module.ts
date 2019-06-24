import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' },
  { path: 'todo-list', loadChildren: './todo-list/todo-list.module#TodoListPageModule', canActivate: [AuthGuard] },
  { path: 'add-todo', loadChildren: './add-todo/add-todo.module#AddTodoPageModule', canActivate: [AuthGuard] },
  { path: 'edit-todo/:id/:title/:description/:date/:difficulty', loadChildren: './edit-todo/edit-todo.module#EditTodoPageModule',
    canActivate: [AuthGuard] },
  { path: 'stats', loadChildren: './stats/stats.module#StatsPageModule', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
