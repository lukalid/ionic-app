import * as firebase from 'firebase';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class AuthService implements OnInit {

    constructor() { }

    static isUserSignedIn() {
        return !!firebase.auth().currentUser;
    }

    static getCurrentUserUid(): string {
        return firebase.auth().currentUser.uid;
    }

    static signUp(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    static signIn(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    static signOut() {
        return firebase.auth().signOut();
    }

    ngOnInit(): void { }

}
