import { Directive, HostListener } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UtilService } from '../util/util.service';
import { Router } from '@angular/router';

@Directive({
    selector: '[appSignout]'
})
export class SignoutDirective {

    constructor(private utilService: UtilService, private router: Router) { }

    @HostListener('click') async onSignout() {
        const loading = await this.utilService.createLoading();
        loading.present();
        AuthService.signOut()
            .then(
                () => {
                    loading.dismiss();
                    this.utilService.showToast('Sign out successful!', 'success');
                    this.router.navigate(['/home']);
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
