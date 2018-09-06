import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-tarefa-detalhes',
  templateUrl: 'tarefa-detalhes.html',
})
export class TarefaDetalhesPage {

  public disciplinaId;
  public descricao;
  public tarefas: any[];

  get staticTurma() {
    return localStorage.getItem('Turma');
  }

  get staticUserName() {
    return localStorage.getItem('NomeAluno');
  }

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.disciplinaId = navParams.get("id");
    this.descricao = navParams.get("descricao");
  }

  ionViewDidLoad() {
    this.getData()
  }

  getData() {
    let token = localStorage.getItem("acessToken");
    let param = localStorage.getItem("MatriculaID");

    let url;

    let loader = this.loadingCtrl.create({
      content: "Por favor, aguarde..."
    });
    loader.present();

    let headers = new Headers({});
    headers.append('Authorization', ' Bearer ' + token);

    let options = new RequestOptions({
      headers: headers
    });

    url = 'https://api.maa.com.br/api/tarefas/' + param + '/disciplinas/' + this.disciplinaId;

    this.http.get(url, options)
      .map((res: Response) => {
        let body = res.json();
        return body || {};
      })
      .subscribe(
      tarefas => {
        setTimeout(() => {
          this.tarefas = tarefas;
          console.log(this.tarefas);
          loader.dismiss();
        }, 1000);
      }
      , err => console.error(err)
      )
  }


}
