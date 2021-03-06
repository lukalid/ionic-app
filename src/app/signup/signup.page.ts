import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UtilService } from '../util/util.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    private formSignup: FormGroup;
    private passwordMinLength = 8;

    constructor(private formBuilder: FormBuilder, private authService: AuthService,
                private router: Router, private utilService: UtilService) { }

    ngOnInit() {
        this.formSignup = this.createSignupForm();
    }

    private createSignupForm(): FormGroup {
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        return this.formBuilder.group(
            {
                email: [null, Validators.compose([CustomValidators.patternValidator(emailRegex, {email: true}), Validators.required])],
                password: [null, Validators.compose([
                    Validators.required,
                    CustomValidators.patternValidator(/\d/, {hasNumber: true}),
                    CustomValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
                    CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),
                    Validators.minLength(this.passwordMinLength)])
                ],
                confirmPassword: [null, Validators.compose([Validators.required])]
            },
            {
                validator: CustomValidators.passwordMatchValidator
            }
        );
    }

    doesPasswordHaveError(error: string) {
        return this.formSignup.controls['password'].hasError('required') || this.formSignup.controls['password'].hasError(error);
    }

    isPasswordValid() {
        return !this.doesPasswordHaveError('minlength') &&
            !this.doesPasswordHaveError('hasNumber') &&
            !this.doesPasswordHaveError('hasCapitalCase') &&
            !this.doesPasswordHaveError('hasSmallCase');
    }

    async onSignUp() {
        if (this.formSignup.valid) {
            const email = this.formSignup.value.email;
            const password = this.formSignup.value.password;
            const loading = await this.utilService.createLoading();
            loading.present();
            AuthService.signUp(email, password)
                .then(() => {
                        loading.dismiss();
                        this.utilService.showToast('Sign up successful!', 'success');
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
        this.formSignup.reset();
        this.router.navigate(['/home']);
    }

    passwordIsTouched() {
        this.formSignup.controls['password'].markAsTouched();
    }

}


