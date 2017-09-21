import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';

/*
  Generated class for the LocalStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalStorageProvider {

  constructor(
  		public toastCtrl: ToastController
  	) {
    console.log('Hello LocalStorageProvider Provider');
  }
  showToast(message: string, position: string)
  {
  	let toast = this.toastCtrl.create({
		      message: message,
		      duration: 3000,
		      //showCloseButton: true,
      		  //closeButtonText: 'Ok',
		      position: position,
		    });
		return toast.present();
  }
}
