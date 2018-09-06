import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { TarefaDetalhesPage } from '../tarefa-detalhes/tarefa-detalhes';
import { HasNoDataProvider } from '../../providers/has-no-data/has-no-data';

@Component({
  selector: 'page-tarefas',
  templateUrl: 'tarefas.html',
})
export class TarefasPage {

  private disciplinas: any[];

  ionViewDidLoad() {
    this.getData()
  }

  get staticAlunoTurma() {
    return localStorage.getItem('Turma');
  }

  constructor(public noData: HasNoDataProvider, private http: Http, public navCtrl: NavController, public loadingCtrl: LoadingController) {

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

    url = 'https://api.maa.com.br/api/tarefas/' + param + '/disciplinas';

    this.http.get(url, options)
      .map((res: Response) => {
        let body = res.json();
        return body || {};
      })
      .subscribe(
      disc => {
        setTimeout(() => {
          this.disciplinas = disc;
          loader.dismiss();
          this.disciplinas.length > 0 ? true : this.noData.hasNoData('Não existem tarefas cadastradas para esta matrícula.');
        }, 1000);
      }
      , err => console.error(err)
      )
  }

  openTarefasDisciplina(event, item, desc) {
    this.navCtrl.push(TarefaDetalhesPage, { id: item, descricao: desc });
  }
}
