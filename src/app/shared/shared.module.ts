import { NgModule } from '@angular/core';
import { AvatarColorDirective } from '../directives/avatar-color.directive';

@NgModule({
    declarations: [
        AvatarColorDirective
    ],
    exports: [
        AvatarColorDirective
    ]
})
export class SharedModule { }
