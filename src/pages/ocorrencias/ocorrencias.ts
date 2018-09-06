import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { HasNoDataProvider } from '../../providers/has-no-data/has-no-data';

@Component({
  selector: 'page-ocorrencias',
  templateUrl: 'ocorrencias.html',
})
export class OcorrenciasPage {

  public ocorrencias: any[];

  get staticUserName() {
    return localStorage.getItem('Nome');
  }

  get staticTurma() {
    return localStorage.getItem('Turma');
  }

  constructor(public noData: HasNoDataProvider, private http: Http, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.getData();
  }


  getData() {
    let apiUrl = 'https://api.maa.com.br/api/ocorrencia/';
    let param = localStorage.getItem("MatriculaID");

    let token = localStorage.getItem("acessToken");

    let loader = this.loadingCtrl.create({
      content: "Por favor, aguarde..."
    });
    loader.present();

    let headers = new Headers({});
    headers.append('Authorization', ' Bearer ' + token);

    let options = new RequestOptions({
      headers: headers
    });

    this.http.get(apiUrl + param, options)
      .map((res: Response) => {
        let body = res.json();
        return body || {};
      }).subscribe(
      data => {
        setTimeout(() => {
          this.ocorrencias = data;
          loader.dismiss();
          data.length > 0 ? true : this.noData.hasNoData('Não existem ocorrências cadastradas para esta matrícula.');
        }, 1000);
      },
      err => console.error(err)
      )
  }

}
