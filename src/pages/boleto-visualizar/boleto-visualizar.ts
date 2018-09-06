import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { Toast } from '@ionic-native/toast';
import { Clipboard } from '@ionic-native/clipboard';

@Component({
  selector: 'page-boleto-visualizar',
  templateUrl: 'boleto-visualizar.html',
})
export class BoletoVisualizarPage {

  constructor(public toast: Toast, private clipboard: Clipboard, public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation, public menu: MenuController) {
    this.menu.enable(false);
  }

  ionViewDidLoad() {
    this.toast.show('Copiado para área de transferência', '5000', 'center')
    .subscribe(
    toast => {
      this.clipboard.copy('teste');
    }
    );

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  ionViewDidLeave(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

}
