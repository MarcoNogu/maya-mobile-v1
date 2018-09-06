import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class HasNoDataProvider {

  constructor(public alert: AlertController) {
  }

  hasNoData(message) {
    let alert = this.alert.create({
      message: message
      , buttons: [{
        text: 'OK'
        , role: 'ok'
      }
      ]
    });
    alert.present();
  }

}
