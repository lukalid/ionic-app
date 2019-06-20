import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../util/util.service';
import { UserModel } from './user.model';

@Injectable()
export class AuthService {

    private url = 'https://ionic-app-mobilno-racunarstvo.firebaseio.com/users.json';

    constructor(private http: HttpClient, private utilService: UtilService) { }

    signUp(firstName: string, lastName: string, email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
            (response) => {
                const user = new UserModel(response.user.uid, firstName, lastName, email, password);
                this.http.post(this.url, user).subscribe(
                    () => this.utilService.showToast('Account has been created.'),
                    (error) => this.utilService.showToast(error)
                );
            },
            (error) => this.utilService.showToast(error)
        );
    }

}
