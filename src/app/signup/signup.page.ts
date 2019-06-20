import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    private formSignup: FormGroup;
    minLength = 8;

    constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

    ngOnInit() {
        this.formSignup = this.createSignupForm();
    }

    private createSignupForm(): FormGroup {
        return this.formBuilder.group(
            {
                firstName: [null, Validators.compose([Validators.required])],
                lastName: [null, Validators.compose([Validators.required])],
                email: [null, Validators.compose([Validators.email, Validators.required])],
                password: [null, Validators.compose([
                    Validators.required,
                    CustomValidators.patternValidator(/\d/, {hasNumber: true}),
                    CustomValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
                    CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),
                    Validators.minLength(this.minLength)])
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

    onSignUp() {
        if (this.formSignup.valid) {
            const firstName = this.formSignup.value.firstName;
            const lastName = this.formSignup.value.lastName;
            const email = this.formSignup.value.email;
            const password = this.formSignup.value.password;
            this.authService.signUp(firstName, lastName, email, password);
        }
    }

}


