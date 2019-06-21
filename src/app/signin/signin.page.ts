import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from '../util/util';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.page.html',
    styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

    formSignIn: FormGroup;
    avatarColor: string;

    constructor(private formBuilder: FormBuilder, private authService: AuthService,
                private router: Router, private route: ActivatedRoute) { }

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
        this.authService.signIn(this.formSignIn.value.email, this.formSignIn.value.password);
    }

    onBack() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

}
