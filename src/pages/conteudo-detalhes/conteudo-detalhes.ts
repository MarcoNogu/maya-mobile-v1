import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
    selector: 'page-conteudo-detalhes',
    templateUrl: 'conteudo-detalhes.html',
})
export class ConteudoDetalhesPage {

    public disciplinaId;
    public descricao;
    conteudos = [];
    size: number = 20;
    page: number = 1;


    constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public loadingCtrl: LoadingController) {
        this.disciplinaId = navParams.get("disciplinaId");
        this.descricao = navParams.get("disciplina");
    }

    ionViewCanEnter() {
        this.getData(localStorage.getItem("MatriculaID"), this.disciplinaId, this.page, this.size)
    }

    getData(matriculaId, disciplinaId, page, count) {
        let token = localStorage.getItem("acessToken");
        let apiUrl = 'https://api.maa.com.br/api/conteudo/' + matriculaId + '/' + disciplinaId + '/' + page + '/' + count;

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
                for (let i in data) {
                    this.conteudos.push(data[i]);
                }
            },
            err => console.error(err)
            )
    }

    infiniteScroll(infiniteScrollEvent) {
        setTimeout(() => {
            this.page++;
            this.getData(localStorage.getItem("MatriculaID"), this.disciplinaId, this.page, this.size);
            infiniteScrollEvent.complete();
        }, 1000);
    }

}
