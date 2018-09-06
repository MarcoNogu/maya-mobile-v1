import { Component } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
    selector: 'page-mensagens',
    templateUrl: 'mensagens.html',
})
export class MensagensPage {

    mensagens = [];
    size: number = 3;
    page: number = 1;

    constructor(private http: Http) { }

    ionViewDidEnter() {
        this.getData(this.page, this.size);
    }

    getData(page, size) {
        let token = localStorage.getItem("acessToken");
        let apiUrl = 'https://api.maa.com.br/api/avisos/' + localStorage.getItem("UsuarioID") + '/' + page + '/' + size;

        let headers = new Headers({});
        headers.append('Authorization', ' Bearer ' + token);

        let options = new RequestOptions({
            headers: headers
        });

        this.http.get(apiUrl, options)
            .map((res: Response) => {
                let body = res.json();
                return body || {};
            })
            .subscribe(
            data => {
                for (let i in data) {
                    this.mensagens.push(data[i]);
                }
            }, err => {
                console.error(err)
            }
            )
    }

    infiniteScroll(infiniteScrollEvent) {
        setTimeout(() => {
            this.page++;
            this.getData(this.page, this.size);
            infiniteScrollEvent.complete();
        }, 1000);
    }
}
