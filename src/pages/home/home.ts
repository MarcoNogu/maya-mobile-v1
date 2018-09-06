import { Component, ViewChild } from '@angular/core';
import { MenuController, Platform } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Toast } from '@ionic-native/toast';
import { Clipboard } from '@ionic-native/clipboard';
import { PushNotificationsProvider } from '../../providers/push-notifications/push-notifications';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('barCanvas') barCanvas;

    barChart: any;
    public sigla: any[];
    public valores: any[];
    public colours = [];
    private visible: Boolean;
    private boleto = [];
    private documentos = [];
    private mensagem = [];

    constructor(public push: PushNotificationsProvider, public platform:Platform, public menu: MenuController, private http: Http, public toast: Toast, private clipboard: Clipboard) {
        this.menu.enable(true);
        // this.menu.open();
        this.visible = false;        
    }

    ionViewWillEnter(){
        if (this.platform.is('cordova')){
            this.push.getPlayerIDOneSignal();            
        }     
    }

    ionViewDidLoad(){
        if (this.platform.is('cordova')){
            this.push.getPlayerIDOneSignal();            
        }
    }

    ngAfterViewInit() {
        this.getData();
        this.getBoleto();
        this.getDocumentos();
        this.getMsg();
    }

    get staticAlunoNome() {
        return localStorage.getItem('NomeAluno');
    }

    get staticAlunoTurma() {
        return localStorage.getItem('Turma');
    }

    getDocumentos() {
        let token = localStorage.getItem("acessToken");

        let url;

        let headers = new Headers({});
        headers.append('Authorization', ' Bearer ' + token);

        let options = new RequestOptions({
            headers: headers
        });

        let param = localStorage.getItem("MatriculaID");

        url = 'https://api.maa.com.br/api/home/' + param + '/documentos'

        this.http.get(url, options)
            .map((res: Response) => {
                let body = res.json();
                return body || {};
            })
            .subscribe(
            data => {
                this.documentos = data;
            }
            , err => console.error(err)
            )
    }


    getMsg() {
        let token = localStorage.getItem("acessToken");
        let UID = localStorage.getItem("UsuarioID");

        let url;

        let headers = new Headers({});
        headers.append('Authorization', ' Bearer ' + token);

        let options = new RequestOptions({
            headers: headers
        });

        url = 'https://api.maa.com.br/api/home/' + UID + '/notificacao';

        this.http.get(url, options)
            .map((res: Response) => {
                let body = res.json();
                return body || {};
            })
            .subscribe(
            data => {
                this.mensagem = data;
            }
            , err => console.error(err)
            )
    }

    getBoleto() {
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

        url = 'https://api.maa.com.br/api/boleto/' + UID + '/'+localStorage.getItem("UsuarioID");
        
        this.http.get(url, options)
            .map((res: Response) => {
                let body = res.json();
                return body || {};
            })
            .subscribe(
            boletos => {
          
                this.boleto = boletos;
            }
            , err => console.error(err)
            )
    }

    codBarras(cod) {
        this.toast.show('Copiado para área de transferência', '5000', 'center')
            .subscribe(
            toast => {
                this.clipboard.copy(cod);
            }
            );
    }

    getData() {
        let apiUrl = 'https://api.maa.com.br/api/faltas/';
        let param = localStorage.getItem("MatriculaID");

        let token = localStorage.getItem("acessToken");

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
                this.sigla = data.map(function (a) {
                    return a.Sigla;
                });
                this.valores = data.map(function (b) {
                    return b.Total;
                });

                var i: number;

                this.visible = this.valores.length > 0 ? true : false;

                for (i = 0; i <= this.valores.length; i++) {
                    this.colours.push('#' + Math.random().toString(16).slice(-6));
                }

                Chart.defaults.global.defaultFontFamily = "Montserrat";
                Chart.defaults.global.defaultFontStyle = "bold";
                this.barChart = new Chart(this.barCanvas.nativeElement, {

                    type: 'bar'
                    , data: {
                        labels: this.sigla
                        , datasets: [{
                            label: 'Faltas'
                            , data: this.valores
                            , borderWidth: 1
                            , backgroundColor: this.colours,
                            borderColor: this.colours,
                        }]
                    }
                    , options: {
                        responsive: true,
                        legend: {
                            onClick: (e) => e.stopPropagation()
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                beginAtZero: true
                                , ticks: {
                                    stepSize: 1
                                    , min: 0
                                    , autoSkip: false
                                },
                            }],
                            yAxes: [{
                                display: true,
                                beginAtZero: true
                                , ticks: {
                                    stepSize: 5
                                    , min: 0
                                    , autoSkip: false
                                },
                            }]
                        }
                    }
                });
            }
            , err => console.error(err)
            )
    }
}    