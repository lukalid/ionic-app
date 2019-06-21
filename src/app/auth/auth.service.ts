import * as firebase from 'firebase';
import {Injectable, OnInit} from '@angular/core';
import {UtilService} from '../util/util.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class AuthService implements OnInit {

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

    isUserSignedIn() {
        return !!firebase.auth().currentUser;
    }

    signOut() {
        firebase.auth().signOut()
            .then(
                () => this.utilService.showToast('Sign out successful!', 'success'),
                (error) => this.utilService.showToast(error, 'danger')
            )
            .catch((error) => this.utilService.showToast(error, 'danger'));
        this.router.navigate(['/home']);
    }

}
