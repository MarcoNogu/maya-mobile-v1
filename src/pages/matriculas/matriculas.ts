import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Http, Headers, Response,  RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
import { HomePage } from '../home/home';

@Component({
  selector: 'page-matriculas',
  templateUrl: 'matriculas.html',
})
export class MatriculasPage {
    
        public aulas: any[];
    
        constructor(public menu: MenuController, private http: Http, public navCtrl: NavController) {
            this.menu.enable(false);
        }   
    
        ionViewDidEnter() {
            this.getData();
        }    
    
        getData() {
            let token = localStorage.getItem("acessToken");
            let apiUrl = 'https://api.maa.com.br/api/matricula/';
            let param = '?id=' + localStorage.getItem("UsuarioID") + '&tipo=' + localStorage.getItem("TipoUsuario");

            let headers = new Headers({});
            headers.append('Authorization', ' Bearer ' + token);
        
            let options = new RequestOptions({
              headers: headers
            });

            this.http.get(apiUrl + param, options)
                .map((res: Response) => {
                    let body = res.json();
                    return body || {};
                })
                .subscribe(
                    data => {
                        setTimeout(() => {
                        this.aulas = data;
                    }, 1000);
                    }
                    , err => {
                        console.error(err)
                    }
                )
        }
    
        obterAluno(matricula) {
            let token = localStorage.getItem("acessToken");
            localStorage.setItem('MatriculaID', matricula);            
            let apiUrl = 'https://api.maa.com.br/api/usuario/'+matricula+'/dados';    
            
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
                        localStorage.setItem('AlunoID', data.UsuarioID);
                        localStorage.setItem('NomeAluno', data.Nome);
                        localStorage.setItem('Turma', data.Turma);
                        localStorage.setItem('UrlFoto', data.Foto);

                        this.navCtrl.setRoot(HomePage);
                    }
                    , err => console.error(err)
                )            
        }

    }
    