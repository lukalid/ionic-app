import * as firebase from 'firebase';
import { Injectable, OnInit } from '@angular/core';
import { UtilService } from '../util/util.service';

@Injectable()
export class AuthService implements OnInit {

    private user: {uid: string, firstName: string, lastName: string, email: string, password: string } = {
      uid: null, firstName: null, lastName: null, email: null, password: null
    };

    constructor(private utilService: UtilService) { }

    ngOnInit(): void { }

    signUp(firstName: string, lastName: string, email: string, password: string): void {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                (response) => {
                    const user = {firstName, lastName, email, password};
                    firebase.firestore().collection('users').doc(response.user.uid).set(user)
                        .then(
                            () => {
                                this.user.uid = response.user.uid;
                                this.user.firstName = user.firstName;
                                this.user.lastName = user.lastName;
                                this.user.email = user.email;
                                this.user.password = user.password;
                                this.utilService.showToast('Account has been created.', 'success');
                            },
                            (error) => this.utilService.showToast(error, 'danger')
                        )
                        .catch((error) => this.utilService.showToast(error, 'danger'));
                },
                (error) => this.utilService.showToast(error, 'danger')
            )
            .catch((error) => this.utilService.showToast(error, 'danger'));
    }

    signIn(email: string, password: string): void {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                () => this.user.uid = firebase.auth().currentUser.uid,
                (error) => this.utilService.showToast(error, 'danger')
            )
            .catch((error) => this.utilService.showToast(error, 'danger'));
    }

    isUserSignedIn() {
        return firebase.auth().currentUser !== null;
    }

    signOut() {
        firebase.auth().signOut();
    }

    getUser() {
        return this.user;
    }

}
