import { Component } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { HasNoDataProvider } from '../../providers/has-no-data/has-no-data';

@Component({
  selector: 'page-grade',
  templateUrl: 'grade.html', 
})
export class GradePage {

  public aulas: any[];

  constructor(public noData: HasNoDataProvider, private http : Http) {
    
  }

  ionViewDidLoad() {
    this.getData();
  }

  get staticUserName() {
    return localStorage.getItem('NomeAluno');
  }

  get staticTurma() {
    return localStorage.getItem('Turma');
  }

  getData() {
    let token = localStorage.getItem("acessToken");
    let apiUrl = 'https://api.maa.com.br/api/grade/';
    let param = localStorage.getItem("MatriculaID");

    let headers = new Headers({});
    headers.append('Authorization', ' Bearer ' + token);

    let options = new RequestOptions({
      headers: headers
    });

    this.http.get(apiUrl+param, options)
        .map((res: Response) => {
            let body = res.json();
            return body || {};
        }).subscribe(
            data => {
                setTimeout(() => {
                    this.aulas = data;
                    data.length > 0 ? true : this.noData.hasNoData('A grade horária não foi criada.');
                }, 1000);
            },
            err => console.error(err)
        )
  }

}
