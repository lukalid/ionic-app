import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable()
export class UtilService {

    constructor(private toastControler: ToastController, private loadingController: LoadingController) { }

    async showToast(message: string, color: string) {
        const toast = await this.toastControler.create({
            message,
            duration: 3000,
            color,
            showCloseButton: true,
            closeButtonText: 'X',
            position: 'bottom'
        });
        toast.present();
    }

    async createLoading(message = 'Please wait...') {
        return this.loadingController.create({
            message
        });
    }

}
