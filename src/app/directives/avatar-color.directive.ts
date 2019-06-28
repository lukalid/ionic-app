import { Directive, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { Util } from '../util/util';

@Directive({
    selector: '[appAvatarColor]'
})
export class AvatarColorDirective implements OnInit, OnDestroy {

    @HostBinding('style.color') color;

    ngOnInit(): void {
        this.color = Util.getAvatarColor();
        Util.avatarColorChanged.subscribe(() => this.color = Util.getAvatarColor());
    }

    ngOnDestroy(): void {
        Util.avatarColorChanged.unsubscribe();
    }

}
