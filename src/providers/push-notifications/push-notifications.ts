import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { OneSignal } from '@ionic-native/onesignal';

let apiUrl = 'https://api.maa.com.br/api/usuario';
@Injectable()
export class PushNotificationsProvider {

  constructor(public http: Http, private oneSignal: OneSignal) {
  }

  getPlayerIDOneSignal() {
    this.oneSignal.startInit('329166bd-0a76-4020-98c7-36eb1b013389', '904384856770');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationOpened().subscribe((message) => {
      // alert(JSON.stringify(message.notification.payload.additionalData));
    });

    this.oneSignal.getIds().then(
      res => {
        this.createPlayerId(localStorage.getItem("UsuarioID"), res.userId);
      }
    );
    this.oneSignal.endInit();
  }

  createPlayerId(userId, playerId) {

    let token = localStorage.getItem("acessToken");

    return new Promise((resolve, reject) => {
      let headers = new Headers({});
      headers.append('Authorization', ' Bearer ' + token);

      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post(apiUrl, "usuarioId=" + userId + "&playerId=" + playerId, {
        headers: headers
      }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

}
