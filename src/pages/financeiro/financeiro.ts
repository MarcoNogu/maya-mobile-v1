import { Component } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Toast } from '@ionic-native/toast';
import { Clipboard } from '@ionic-native/clipboard';
import 'rxjs/add/operator/map'
import { HasNoDataProvider } from '../../providers/has-no-data/has-no-data';
import { Nav, MenuController } from 'ionic-angular';
import { BoletoVisualizarPage } from '../boleto-visualizar/boleto-visualizar';

@Component({
  selector: 'page-financeiro',
  templateUrl: 'financeiro.html',
})
export class FinanceiroPage {

  boletos = [];
  size: number = 3;
  page: number = 1;

  constructor(public nav: Nav, public noData:HasNoDataProvider, private http: Http, public toast: Toast, private clipboard: Clipboard, public menu: MenuController) {
    this.menu.enable(true);
   }

  ionViewCanEnter() {
    this.getData(this.page, this.size);
    this.menu.enable(true);
  }

  get staticUserName() {
    return localStorage.getItem('NomeAluno');
  }

  getData(page, size) {
    let token = localStorage.getItem("acessToken");
    let UID = localStorage.getItem("UsuarioID");
    let tipoUsuario = localStorage.getItem("TipoUsuario");

    if (tipoUsuario === "2") {
      UID = localStorage.getItem("AlunoID");
    }

    let url;

    let headers = new Headers({});
    headers.append('Authorization', ' Bearer ' + token);

    let options = new RequestOptions({
      headers: headers
    });

    url = 'https://api.maa.com.br/api/boleto/' + UID + '/' + page + '/' + size;

    this.http.get(url, options)
      .map((res: Response) => {
        let body = res.json();
        return body || {};
      })
      .subscribe(
      boletos => {
        for (let i in boletos) {
          this.boletos.push(boletos[i]);
        }
        boletos.length > 0 ? true : this.noData.hasNoData('Não existem cobranças.');
      }
      , err => console.error(err)
      )
  }

  infiniteScroll(infiniteScrollEvent) {
    setTimeout(() => {
      this.page++;
      this.getData(this.page, this.size);
      infiniteScrollEvent.complete();
    }, 1000);
  }

  codBarras(cod) {
    this.toast.show('Copiado para área de transferência', '5000', 'center')
      .subscribe(
      toast => {
        this.clipboard.copy(cod);
      }
      );
  }

  enviaEmail(cod) {
    this.nav.push(BoletoVisualizarPage);
  }

}
