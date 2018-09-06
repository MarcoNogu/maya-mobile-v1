import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { NotasDetalhesPage } from '../notas-detalhes/notas-detalhes';
import { HasNoDataProvider } from '../../providers/has-no-data/has-no-data';

@Component({
    selector: 'page-notas',
    templateUrl: 'notas.html',
})
export class NotasPage {

    public periodos: any[];

    get staticAlunoTurma() {
        return localStorage.getItem('Turma');
    }

    constructor(public noData: HasNoDataProvider, private http: Http, public navCtrl: NavController, public loadingCtrl: LoadingController) {
        this.getData();
    }


    getData() {
        let token = localStorage.getItem("acessToken");

        let headers = new Headers({});
        headers.append('Authorization', ' Bearer ' + token);
    
        let options = new RequestOptions({
          headers: headers
        });

        let apiUrl = 'https://api.maa.com.br/api/periodo/';
        let param = localStorage.getItem("MatriculaID");

        let loader = this.loadingCtrl.create({
            content: "Por favor, aguarde..."
        });
        loader.present();

        console.clear();
        console.log(options);
        

        this.http.get(apiUrl + param, options)
            .map((res: Response) => {
                let body = res.json();
                return body || {};
            }).subscribe(
            data => {
                setTimeout(() => {
                    this.periodos = data;
                    loader.dismiss();
                   data.length > 0 ? true : this.noData.hasNoData('Não existem notas cadastradas para esta matrícula.');
                }, 1000);
            },
            err => console.error(err)
            )
    }

    openNotasDetalhes(event, item, desc) {
        this.navCtrl.push(NotasDetalhesPage, { periodo: item, descricao: desc });
    }

}
