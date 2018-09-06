import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

import { HasNoDataProvider } from '../../providers/has-no-data/has-no-data';

import { ConteudoDetalhesPage } from '../conteudo-detalhes/conteudo-detalhes';

@Component({
  selector: 'page-conteudo',
  templateUrl: 'conteudo.html',
})
export class ConteudoPage {

  public disciplinas: any[];
  constructor(public noData : HasNoDataProvider, private http: Http, public navCtrl: NavController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.getData();
  }


  openConteudoDetalhes(event, item, desc) {
    this.navCtrl.push(ConteudoDetalhesPage, { disciplinaId: item, disciplina: desc });
  }


  getData() {
    let token = localStorage.getItem("acessToken");
    let param = localStorage.getItem("MatriculaID");

    let apiUrl = 'https://api.maa.com.br/api/conteudo/' + param + '/disciplinas';

    let loader = this.loadingCtrl.create({
      content: "Por favor, aguarde..."
    });
    loader.present();

    let headers = new Headers({});
    headers.append('Authorization', ' Bearer ' + token);

    let options = new RequestOptions({
      headers: headers
    });

    this.http.get(apiUrl, options)
      .map((res: Response) => {
        let body = res.json();
        return body || {};
      }).subscribe(
      data => {
        setTimeout(() => {
          this.disciplinas = data;
          data.length > 0 ? true : this.noData.hasNoData('Não existem registros de aula.');
          loader.dismiss();
        }, 1000);
      },
      err => console.error(err)
      )
  }

}
