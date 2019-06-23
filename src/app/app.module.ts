import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as firebase from 'firebase';
import { AuthService } from './auth/auth.service';
import { UtilService } from './util/util.service';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './todo-list/todo.service';

firebase.initializeApp({
  apiKey: 'AIzaSyCdQzJ6tsF6TngzOhbHQdjBNCJ0uMdcXPg',
  authDomain: 'ionic-app-mobilno-racunarstvo.firebaseapp.com',
  databaseURL: 'https://ionic-app-mobilno-racunarstvo.firebaseio.com',
  projectId: 'ionic-app-mobilno-racunarstvo',
  storageBucket: 'ionic-app-mobilno-racunarstvo.appspot.com',
  messagingSenderId: '754349644267',
  appId: '1:754349644267:web:341205df4c99e1d0'
});

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    TodoService,
    AuthService,
    UtilService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
