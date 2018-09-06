import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-dados',
  templateUrl: 'dados.html',
})
export class DadosPage {
  public configs: any [];
  
    constructor(private http : Http, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    }
  
    ionViewDidLoad() {
      this.getData();
    }
  
    getData() {
      let token = localStorage.getItem("acessToken");
      let apiUrl = 'https://api.maa.com.br/api/usuario/';
      let param = localStorage.getItem("UsuarioID");
  
      let loader = this.loadingCtrl.create({
          content: "Por favor, aguarde..."
      });
      loader.present();

      let headers = new Headers({});
      headers.append('Authorization', ' Bearer ' + token);
  
      let options = new RequestOptions({
        headers: headers
      });
  
      this.http.get(apiUrl+param, options)
          .map((res: Response) => {
              let body = res.json();
              return body || [];
          }).subscribe(
              data => {
                  setTimeout(() => {
                      this.configs = Array.of(data);
                      console.log(this.configs)
                      loader.dismiss();
                  }, 1000);
              },
              err => console.error(err)
          )
    }
  
  }
  