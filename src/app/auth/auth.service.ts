import * as firebase from 'firebase';
import {Injectable, OnInit} from '@angular/core';
import {UtilService} from '../util/util.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class AuthService implements OnInit {

    private url = 'https://ionic-app-mobilno-racunarstvo.firebaseio.com/users.json';

    private token: string;

    constructor(private router: Router, private httpClient: HttpClient, private utilService: UtilService) {
    }

    ngOnInit(): void {
    }

    signUp(firstName: string, lastName: string, email: string, password: string): void {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                    this.router.navigate(['/home']);
                    this.utilService.showToast('Sign up successful!', 'success');
                },
                (error) => this.utilService.showToast(error, 'danger')
            )
            .catch((error) => this.utilService.showToast(error, 'danger'));
    }

    signIn(email: string, password: string): void {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                () => {
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token) => {
                                this.token = token;
                                this.router.navigate(['/home']);
                                this.utilService.showToast('Sign in successful!', 'success');
                            },
                            (error) => this.utilService.showToast(error, 'danger')
                        )
                        .catch((error) => this.utilService.showToast(error, 'danger'));
                },
                (error) => this.utilService.showToast(error, 'danger')
            )
            .catch((error) => this.utilService.showToast(error, 'danger'));
    }

    getToken() {
        firebase.auth().currentUser.getIdToken().then((token) => this.token = token);
        return this.token;
    }

    isUserSignedIn() {
        return this.token != null;
    }

    signOut() {
        firebase.auth().signOut()
            .then(
                () => this.utilService.showToast('Sign out successful!', 'success'),
                (error) => this.utilService.showToast(error, 'danger')
            )
            .catch((error) => this.utilService.showToast(error, 'danger'));
        this.token = null;
        this.router.navigate(['/home']);
    }

}
