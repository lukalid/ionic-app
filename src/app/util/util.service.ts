import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable()
export class UtilService {

    constructor(private toastControler: ToastController) { }

    async showToast(message: string, color: string) {
        const toast = await this.toastControler.create({
            message,
            duration: 5000,
            color,
            showCloseButton: true,
            closeButtonText: 'X',
            position: 'bottom'
        });
        toast.present();
    }

}
