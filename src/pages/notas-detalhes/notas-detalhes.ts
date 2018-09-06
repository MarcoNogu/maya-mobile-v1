import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-notas-detalhes',
  templateUrl: 'notas-detalhes.html',
})
export class NotasDetalhesPage {

  public periodo;
  public descricao;
  public notas: any[];

  get staticTurma() {
    return localStorage.getItem('Turma');
  }

  get staticUserName() {
    return localStorage.getItem('NomeAluno');
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public loadingCtrl: LoadingController) {
    this.periodo = navParams.get("periodo");
    this.descricao = navParams.get("descricao");
    this.getData(this.periodo);
  }

  getData(periodoId) {
    let token = localStorage.getItem("acessToken");
    let MatriculaID = localStorage.getItem("MatriculaID");
    let periodo = "&periodo="+periodoId
    let apiUrl = 'https://api.maa.com.br/api/notas/?id='+MatriculaID+periodo;

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
                    console.clear();
                    this.notas = data;
                    console.info(data);
                    loader.dismiss();
                }, 1000);
            },
            err => console.error(err)
        )
  }

}
