import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MenuOptionsProvider {

  constructor(public http: Http) {
  }

  buildMenuButtons(UsuarioID) {
    let token = localStorage.getItem("acessToken");
    let headers = new Headers({});
    headers.append('Authorization', ' Bearer ' + token);

    let options = new RequestOptions({
      headers: headers
    });

    return this.http.get('https://api.maa.com.br/api/menuapp/'+UsuarioID+'/paginas', options)
    .map((res: Response) => {
      let body = res.json();
      console.log('https://api.maa.com.br/api/menuapp/'+UsuarioID+'/paginas');
      return body || {};
    })
  }
}
