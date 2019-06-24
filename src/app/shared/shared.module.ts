import { NgModule } from '@angular/core';
import { AvatarColorDirective } from '../directives/avatar-color.directive';
import { SignoutDirective } from '../directives/signout.directive';

@NgModule({
    declarations: [
        AvatarColorDirective,
        SignoutDirective
    ],
    exports: [
        AvatarColorDirective,
        SignoutDirective
    ]
})
export class SharedModule { }
