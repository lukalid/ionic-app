import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Util } from '../util/util';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.page.html',
    styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

    private formSignIn: FormGroup;
    private avatarColor: string;

    constructor(private formBuilder: FormBuilder, private authService: AuthService,
                private router: Router) { }

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

    onSignIn() {
        if (this.formSignIn.valid) {
            this.authService.signIn(this.formSignIn.value.email, this.formSignIn.value.password);
        }
    }

    onBack() {
        this.formSignIn.reset();
        this.router.navigate(['/home']);
    }

}
