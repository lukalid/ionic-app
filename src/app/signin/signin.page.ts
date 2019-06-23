import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Util } from '../util/util';
import { Router } from '@angular/router';
import { UtilService } from '../util/util.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.page.html',
    styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

    private formSignIn: FormGroup;
    private avatarColor: string;

    constructor(private formBuilder: FormBuilder, private authService: AuthService,
                private router: Router, private utilService: UtilService) { }

    ngOnInit() {
        this.formSignIn = this.createSigninForm();
        this.avatarColor = Util.getAvatarColor();
    }

    private createSigninForm(): FormGroup {
        return this.formBuilder.group({
            email: [null, Validators.compose([Validators.required])],
            password: [null, Validators.compose([Validators.required])]
        });
    }

    async onSignIn() {
        if (this.formSignIn.valid) {
            const loading = await this.utilService.createLoading();
            loading.present();
            AuthService.signIn(this.formSignIn.value.email, this.formSignIn.value.password)
                .then(
                    () => {
                        loading.dismiss();
                        this.utilService.showToast('Sign in successful!', 'success');
                        this.onBack();
                    },
                    (error) => {
                        loading.dismiss();
                        this.utilService.showToast(error, 'danger');
                    }
                )
                .catch((error) => {
                    loading.dismiss();
                    this.utilService.showToast(error, 'danger');
                });
        }
    }

    onBack() {
        this.formSignIn.reset();
        this.router.navigate(['/home']);
    }

}
