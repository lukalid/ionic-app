import {Directive, HostBinding, OnInit} from '@angular/core';
import {Util} from '../util/util';

@Directive({
    selector: '[appAvatarColor]'
})
export class AvatarColorDirective implements OnInit {

    @HostBinding('style.color') color;

    ngOnInit(): void {
        this.color = Util.getAvatarColor();
        Util.avatarColorChanged.subscribe(() => this.color = Util.getAvatarColor());
    }

}
