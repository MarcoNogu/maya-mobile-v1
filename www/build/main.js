webpackJsonp([0],{

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_clipboard__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_push_notifications_push_notifications__ = __webpack_require__(337);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = (function () {
    function HomePage(push, platform, menu, http, toast, clipboard) {
        this.push = push;
        this.platform = platform;
        this.menu = menu;
        this.http = http;
        this.toast = toast;
        this.clipboard = clipboard;
        this.colours = [];
        this.boleto = [];
        this.documentos = [];
        this.mensagem = [];
        this.menu.enable(true);
        // this.menu.open();
        this.visible = false;
    }
    HomePage.prototype.ionViewWillEnter = function () {
        if (this.platform.is('cordova')) {
            this.push.getPlayerIDOneSignal();
        }
    };
    HomePage.prototype.ionViewDidLoad = function () {
        if (this.platform.is('cordova')) {
            this.push.getPlayerIDOneSignal();
        }
    };
    HomePage.prototype.ngAfterViewInit = function () {
        this.getData();
        this.getBoleto();
        this.getDocumentos();
        this.getMsg();
    };
    Object.defineProperty(HomePage.prototype, "staticAlunoNome", {
        get: function () {
            return localStorage.getItem('NomeAluno');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomePage.prototype, "staticAlunoTurma", {
        get: function () {
            return localStorage.getItem('Turma');
        },
        enumerable: true,
        configurable: true
    });
    HomePage.prototype.getDocumentos = function () {
        var _this = this;
        var token = localStorage.getItem("acessToken");
        var url;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]({});
        headers.append('Authorization', ' Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        var param = localStorage.getItem("MatriculaID");
        url = 'https://api.maa.com.br/api/home/' + param + '/documentos';
        this.http.get(url, options)
            .map(function (res) {
            var body = res.json();
            return body || {};
        })
            .subscribe(function (data) {
            _this.documentos = data;
        }, function (err) { return console.error(err); });
    };
    HomePage.prototype.getMsg = function () {
        var _this = this;
        var token = localStorage.getItem("acessToken");
        var UID = localStorage.getItem("UsuarioID");
        var url;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]({});
        headers.append('Authorization', ' Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        url = 'https://api.maa.com.br/api/home/' + UID + '/notificacao';
        this.http.get(url, options)
            .map(function (res) {
            var body = res.json();
            return body || {};
        })
            .subscribe(function (data) {
            _this.mensagem = data;
        }, function (err) { return console.error(err); });
    };
    HomePage.prototype.getBoleto = function () {
        var _this = this;
        var token = localStorage.getItem("acessToken");
        var UID = localStorage.getItem("UsuarioID");
        var tipoUsuario = localStorage.getItem("TipoUsuario");
        if (tipoUsuario === "2") {
            UID = localStorage.getItem("AlunoID");
        }
        var url;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]({});
        headers.append('Authorization', ' Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        url = 'https://api.maa.com.br/api/boleto/' + UID + '/' + localStorage.getItem("UsuarioID");
        this.http.get(url, options)
            .map(function (res) {
            var body = res.json();
            return body || {};
        })
            .subscribe(function (boletos) {
            _this.boleto = boletos;
        }, function (err) { return console.error(err); });
    };
    HomePage.prototype.codBarras = function (cod) {
        var _this = this;
        this.toast.show('Copiado para área de transferência', '5000', 'center')
            .subscribe(function (toast) {
            _this.clipboard.copy(cod);
        });
    };
    HomePage.prototype.getData = function () {
        var _this = this;
        var apiUrl = 'https://api.maa.com.br/api/faltas/';
        var param = localStorage.getItem("MatriculaID");
        var token = localStorage.getItem("acessToken");
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]({});
        headers.append('Authorization', ' Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        this.http.get(apiUrl + param, options)
            .map(function (res) {
            var body = res.json();
            return body || {};
        })
            .subscribe(function (data) {
            _this.sigla = data.map(function (a) {
                return a.Sigla;
            });
            _this.valores = data.map(function (b) {
                return b.Total;
            });
            var i;
            _this.visible = _this.valores.length > 0 ? true : false;
            for (i = 0; i <= _this.valores.length; i++) {
                _this.colours.push('#' + Math.random().toString(16).slice(-6));
            }
            __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"].defaults.global.defaultFontFamily = "Montserrat";
            __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"].defaults.global.defaultFontStyle = "bold";
            _this.barChart = new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](_this.barCanvas.nativeElement, {
                type: 'bar',
                data: {
                    labels: _this.sigla,
                    datasets: [{
                            label: 'Faltas',
                            data: _this.valores,
                            borderWidth: 1,
                            backgroundColor: _this.colours,
                            borderColor: _this.colours,
                        }]
                },
                options: {
                    responsive: true,
                    legend: {
                        onClick: function (e) { return e.stopPropagation(); }
                    },
                    scales: {
                        xAxes: [{
                                display: true,
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1,
                                    min: 0,
                                    autoSkip: false
                                },
                            }],
                        yAxes: [{
                                display: true,
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 5,
                                    min: 0,
                                    autoSkip: false
                                },
                            }]
                    }
                }
            });
        }, function (err) { return console.error(err); });
    };
    return HomePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('barCanvas'),
    __metadata("design:type", Object)
], HomePage.prototype, "barCanvas", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\home\home.html"*/'<ion-header>\n        <ion-navbar>\n           <button ion-button menuToggle>\n              <ion-icon id="button-menu" ios="ios-menu" md="md-menu"></ion-icon>\n           </button>\n           <ion-title>Home</ion-title>\n        </ion-navbar>\n     </ion-header>\n     <ion-content>\n        <h1>Seja Bem-Vindo(a)</h1>\n        <ion-card>\n           <ion-card-content>\n              <ion-card-title text-center>Você está visualizando as informações de: </ion-card-title>\n              <h3>{{staticAlunoNome}}</h3>\n              <h3>{{staticAlunoTurma}}</h3>\n           </ion-card-content>\n        </ion-card>\n        <div *ngIf="documentos?.length > 0">\n           <h1>Atenção</h1>\n           <ion-card>\n              <ion-card-content>\n                 <ion-card-title text-center>Documentos Pendentes</ion-card-title>\n                 <ul>\n                    <li *ngFor="let item of documentos">{{item.Descricao}}</li>\n                 </ul>\n              </ion-card-content>\n           </ion-card>\n        </div>\n           <div *ngFor="let msg of mensagem">\n              <h1>Notificações</h1>\n              <ion-card>\n                 <ion-card-content>\n                    <ion-card-title text-center>{{ msg.Titulo }}</ion-card-title>\n                    <h3>Data {{ msg.Data | date: \'dd/MM/yyyy\'}}</h3>\n                    <br>\n                    <h4>{{ msg.Mensagem }}</h4>\n                    <br>\n                    <span>{{ msg.Por }}</span>\n                 </ion-card-content>\n              </ion-card>\n           </div>\n        <div [class.hide]="!visible">\n           <h1>Frequência do Aluno</h1>\n           <ion-card>\n              <ion-card-header>\n                 Faltas por disciplina\n              </ion-card-header>\n              <ion-card-content>\n                 <canvas #barCanvas></canvas>\n                 <br>\n              </ion-card-content>\n           </ion-card>\n        </div>\n        <div *ngFor="let item of boleto">\n        <div *ngIf="item.AcessoPermitido">\n           <h1>Financeiro</h1>\n           <ion-card>\n              <ion-card-content>\n                 <ion-card-title text-center>Cobrança do mês atual</ion-card-title>\n                 <h3 *ngIf="item.Status">(Pago)</h3>\n                 <h4>Vencimento em {{item.Vencimento}}</h4>\n                 <br>\n                 <h5>R$ {{item.Previsto}}</h5>\n                 <hr>\n                 <button *ngIf="!item.Status" ion-button (click)="codBarras(item.CodBarras)">Cód. De Barras</button>\n              </ion-card-content>\n           </ion-card>\n        </div>\n        </div>\n     </ion-content>'/*ion-inline-end:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__providers_push_notifications_push_notifications__["a" /* PushNotificationsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_clipboard__["a" /* Clipboard */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__matriculas_matriculas__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_menu_options_menu_options__ = __webpack_require__(116);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = (function () {
    function LoginPage(menuOptions, toast, menu, loadingCtrl, navCtrl, authService, formBuilder) {
        this.menuOptions = menuOptions;
        this.toast = toast;
        this.menu = menu;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.menu.enable(false);
        this.login = this.formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].email],
            password: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
            rememberMe: ['']
        });
    }
    LoginPage.prototype.submit = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Por favor, aguarde...'
        });
        loader.present();
        this.authService.postData(this.login.value.username, this.login.value.password)
            .then(function (result) {
            setTimeout(function () {
                _this.resposeData = result;
                localStorage.setItem('acessToken', _this.resposeData.access_token);
                localStorage.setItem('UsuarioID', _this.resposeData.UsuarioID);
                localStorage.setItem('TipoUsuario', _this.resposeData.TipoUsuario);
                localStorage.setItem('Nome', _this.resposeData.Nome);
                localStorage.setItem('EmpresaID', _this.resposeData.EmpresaID);
                localStorage.setItem("Email", _this.login.value.username);
                localStorage.setItem("Password", _this.login.value.password);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__matriculas_matriculas__["a" /* MatriculasPage */]);
                loader.dismiss();
            }, 1000);
        }, function (err) {
            loader.dismiss();
            err.status === 400 ? _this.failed() : console.error(err);
        });
    };
    LoginPage.prototype.failed = function () {
        this.toast.show('E-mail ou Senha inválidos', '5000', 'center').subscribe(function (toast) { });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\login\login.html"*/'<ion-content class="login-content">\n  <ion-row class="logo-row">\n    <ion-col>\n      <img src="assets/img/logo.png" width="200" />      \n      <!-- <img src="https://www.haya.com.br/images/logo-colegiohaya.png" />     -->\n    </ion-col>\n  </ion-row>\n  <div class="login-box">\n    <form (ngSubmit)="submit()" [formGroup]="login">\n      <ion-row>\n        <ion-col>\n          <ion-list inset>\n            <ion-item>\n              <ion-input type="email" placeholder="E-mail" formControlName="username"></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-input type="number" style="-webkit-text-security:disc;" placeholder="Senha" formControlName="password"></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-label>Lembrar-Me</ion-label>\n              <ion-checkbox color="#C400FF" checked="true" formControlName="rememberMe"></ion-checkbox>\n            </ion-item>\n\n          </ion-list>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col class="signup-col">\n          <button ion-button class="submit-btn" full [disabled]="!login.valid" type="submit">Entrar</button>\n        </ion-col>\n      </ion-row>\n\n    </form>\n\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__providers_menu_options_menu_options__["a" /* MenuOptionsProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MatriculasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MatriculasPage = (function () {
    function MatriculasPage(menu, http, navCtrl) {
        this.menu = menu;
        this.http = http;
        this.navCtrl = navCtrl;
        this.menu.enable(false);
    }
    MatriculasPage.prototype.ionViewDidEnter = function () {
        this.getData();
    };
    MatriculasPage.prototype.getData = function () {
        var _this = this;
        var token = localStorage.getItem("acessToken");
        var apiUrl = 'https://api.maa.com.br/api/matricula/';
        var param = '?id=' + localStorage.getItem("UsuarioID") + '&tipo=' + localStorage.getItem("TipoUsuario");
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({});
        headers.append('Authorization', ' Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        this.http.get(apiUrl + param, options)
            .map(function (res) {
            var body = res.json();
            return body || {};
        })
            .subscribe(function (data) {
            setTimeout(function () {
                _this.aulas = data;
            }, 1000);
        }, function (err) {
            console.error(err);
        });
    };
    MatriculasPage.prototype.obterAluno = function (matricula) {
        var _this = this;
        var token = localStorage.getItem("acessToken");
        localStorage.setItem('MatriculaID', matricula);
        var apiUrl = 'https://api.maa.com.br/api/usuario/' + matricula + '/dados';
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({});
        headers.append('Authorization', ' Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        this.http.get(apiUrl, options)
            .map(function (res) {
            var body = res.json();
            return body || {};
        })
            .subscribe(function (data) {
            localStorage.setItem('AlunoID', data.UsuarioID);
            localStorage.setItem('NomeAluno', data.Nome);
            localStorage.setItem('Turma', data.Turma);
            localStorage.setItem('UrlFoto', data.Foto);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
        }, function (err) { return console.error(err); });
    };
    return MatriculasPage;
}());
MatriculasPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-matriculas',template:/*ion-inline-start:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\matriculas\matriculas.html"*/'<ion-content>\n  <h1>Selecione qual matrícula você deseja visualizar :) </h1>\n  <ion-card *ngFor="let item of aulas">\n    <ion-card-content>\n      <ion-card-title>\n        {{item.Nome}}\n      </ion-card-title>\n      <ion-list radio-group [(ngModel)]="qualMatricula">\n        <ion-item *ngFor="let data of item[\'Matriculas\']">\n          <ion-label>{{data.Turma}}</ion-label>\n          <ion-radio value="{{data.MatriculaID}}" (click)="obterAluno(data.MatriculaID)"></ion-radio>\n        </ion-item>\n      </ion-list>\n    </ion-card-content>\n  </ion-card>\n  <div *ngIf="aulas?.length === 0">\n    <ion-card>\n      <ion-card-content>\n        <ion-card-title>\n          Desculpe :(\n        </ion-card-title>\n        <p>Ainda não existe nenhuma matrícula em seu usuário! Por favor, entre em contato com a secretaria.</p>\n      </ion-card-content>\n    </ion-card>\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\matriculas\matriculas.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
], MatriculasPage);

//# sourceMappingURL=matriculas.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var apiUrl = 'https://api.maa.com.br/Token';
var AuthServiceProvider = (function () {
    function AuthServiceProvider(http) {
        this.http = http;
    }
    AuthServiceProvider.prototype.postData = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({});
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            _this.http.post(apiUrl, "username=" + username + "&password=" + password + "&grant_type=password", {
                headers: headers
            }).
                subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    return AuthServiceProvider;
}());
AuthServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], AuthServiceProvider);

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuOptionsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MenuOptionsProvider = (function () {
    function MenuOptionsProvider(http) {
        this.http = http;
    }
    MenuOptionsProvider.prototype.buildMenuButtons = function (UsuarioID) {
        var token = localStorage.getItem("acessToken");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({});
        headers.append('Authorization', ' Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        return this.http.get('https://api.maa.com.br/api/menuapp/' + UsuarioID + '/paginas', options)
            .map(function (res) {
            var body = res.json();
            console.log('https://api.maa.com.br/api/menuapp/' + UsuarioID + '/paginas');
            return body || {};
        });
    };
    return MenuOptionsProvider;
}());
MenuOptionsProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], MenuOptionsProvider);

//# sourceMappingURL=menu-options.js.map

/***/ }),

/***/ 125:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 125;

/***/ }),

/***/ 167:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 167;

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DadosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DadosPage = (function () {
    function DadosPage(http, navCtrl, navParams, loadingCtrl) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
    }
    DadosPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    DadosPage.prototype.getData = function () {
        var _this = this;
        var token = localStorage.getItem("acessToken");
        var apiUrl = 'https://api.maa.com.br/api/usuario/';
        var param = localStorage.getItem("UsuarioID");
        var loader = this.loadingCtrl.create({
            content: "Por favor, aguarde..."
        });
        loader.present();
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({});
        headers.append('Authorization', ' Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        this.http.get(apiUrl + param, options)
            .map(function (res) {
            var body = res.json();
            return body || [];
        }).subscribe(function (data) {
            setTimeout(function () {
                _this.configs = Array.of(data);
                console.log(_this.configs);
                loader.dismiss();
            }, 1000);
        }, function (err) { return console.error(err); });
    };
    return DadosPage;
}());
DadosPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-dados',template:/*ion-inline-start:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\dados\dados.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon id="button-menu" ios="ios-menu" md="md-menu"></ion-icon>\n        </button>\n        <ion-title>Confira seus dados</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list *ngFor="let item of configs">\n        <ion-list-header>\n            Confira seus dados\n        </ion-list-header>\n        <ion-item>\n            <ion-label color="primary" stacked>Nome</ion-label>\n            <ion-input type="nome" value="{{ item.Nome }}" disabled="true"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label color="primary" stacked>Telefone</ion-label>\n            <ion-input type="text" value="{{ item.Telefone }}" disabled="true"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label color="primary" stacked>Celular</ion-label>\n            <ion-input type="text" value="{{ item.Celular }}" disabled="true"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label color="primary" stacked>E-mail</ion-label>\n            <ion-input type="text" value="{{ item.Email }}" disabled="true"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label color="primary" stacked>CEP</ion-label>\n            <ion-input type="text" value="{{ item.CEP }}" disabled="true"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label color="primary" stacked>Endereço</ion-label>\n            <ion-input type="text" value="{{ item.Endereco }}" disabled="true"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label color="primary" stacked>RG</ion-label>\n            <ion-input type="text" value="{{ item.RG }}" disabled="true"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label color="primary" stacked>CPF</ion-label>\n            <ion-input type="text" value="{{ item.CPF }}" disabled="true"></ion-input>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\dados\dados.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], DadosPage);

//# sourceMappingURL=dados.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConteudoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_has_no_data_has_no_data__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__conteudo_detalhes_conteudo_detalhes__ = __webpack_require__(214);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ConteudoPage = (function () {
    function ConteudoPage(noData, http, navCtrl, loadingCtrl) {
        this.noData = noData;
        this.http = http;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    ConteudoPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    ConteudoPage.prototype.openConteudoDetalhes = function (event, item, desc) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__conteudo_detalhes_conteudo_detalhes__["a" /* ConteudoDetalhesPage */], { disciplinaId: item, disciplina: desc });
    };
    ConteudoPage.prototype.getData = function () {
        var _this = this;
        var token = localStorage.getItem("acessToken");
        var param = localStorage.getItem("MatriculaID");
        var apiUrl = 'https://api.maa.com.br/api/conteudo/' + param + '/disciplinas';
        var loader = this.loadingCtrl.create({
            content: "Por favor, aguarde..."
        });
        loader.present();
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({});
        headers.append('Authorization', ' Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        this.http.get(apiUrl, options)
            .map(function (res) {
            var body = res.json();
            return body || {};
        }).subscribe(function (data) {
            setTimeout(function () {
                _this.disciplinas = data;
                data.length > 0 ? true : _this.noData.hasNoData('Não existem registros de aula.');
                loader.dismiss();
            }, 1000);
        }, function (err) { return console.error(err); });
    };
    return ConteudoPage;
}());
ConteudoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-conteudo',template:/*ion-inline-start:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\conteudo\conteudo.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon id="button-menu" ios="ios-menu" md="md-menu"></ion-icon>\n        </button>\n        <ion-title>Conteúdo Programático</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <h1>Disciplinas</h1>\n    <ion-grid>\n        <ion-row>\n            <ion-col col-6 *ngFor="let item of disciplinas">\n                <ion-card tappable (click)="openConteudoDetalhes($event, item.DisciplinaId, item.Disciplina)" class="item-remove-animate list-grow-animation">\n                    <ion-card-content>\n                        {{item.Disciplina}}\n                    </ion-card-content>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\conteudo\conteudo.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_has_no_data_has_no_data__["a" /* HasNoDataProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], ConteudoPage);

//# sourceMappingURL=conteudo.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConteudoDetalhesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ConteudoDetalhesPage = (function () {
    function ConteudoDetalhesPage(navCtrl, navParams, http, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.conteudos = [];
        this.size = 20;
        this.page = 1;
        this.disciplinaId = navParams.get("disciplinaId");
        this.descricao = navParams.get("disciplina");
    }
    ConteudoDetalhesPage.prototype.ionViewCanEnter = function () {
        this.getData(localStorage.getItem("MatriculaID"), this.disciplinaId, this.page, this.size);
    };
    ConteudoDetalhesPage.prototype.getData = function (matriculaId, disciplinaId, page, count) {
        var _this = this;
        var token = localStorage.getItem("acessToken");
        var apiUrl = 'https://api.maa.com.br/api/conteudo/' + matriculaId + '/' + disciplinaId + '/' + page + '/' + count;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({});
        headers.append('Authorization', ' Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        this.http.get(apiUrl, options)
            .map(function (res) {
            var body = res.json();
            return body || {};
        }).subscribe(function (data) {
            for (var i in data) {
                _this.conteudos.push(data[i]);
            }
        }, function (err) { return console.error(err); });
    };
    ConteudoDetalhesPage.prototype.infiniteScroll = function (infiniteScrollEvent) {
        var _this = this;
        setTimeout(function () {
            _this.page++;
            _this.getData(localStorage.getItem("MatriculaID"), _this.disciplinaId, _this.page, _this.size);
            infiniteScrollEvent.complete();
        }, 1000);
    };
    return ConteudoDetalhesPage;
}());
ConteudoDetalhesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-conteudo-detalhes',template:/*ion-inline-start:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\conteudo-detalhes\conteudo-detalhes.html"*/'<ion-header>\n        <ion-navbar>\n                <button ion-button menuToggle>\n                        <ion-icon id="button-menu" ios="ios-menu" md="md-menu"></ion-icon>\n                </button>\n                <ion-title>{{descricao}}</ion-title>\n        </ion-navbar>\n</ion-header>\n<ion-content>\n        <ion-card *ngFor="let item of conteudos">\n                <ion-card-header>\n                        {{item.Data | date: \'dd/MM/yyyy\'}}\n                </ion-card-header>\n                <ion-card-content>\n                        <br>\n                        <p>\n                                <span>Programado: </span>{{item.Programado}}</p>\n                        <hr>\n                        <p>\n                                <span>Conteúdo: </span>{{item.ConteudoAula}}</p>\n                </ion-card-content>\n        </ion-card>\n        <ion-infinite-scroll *ngIf="page < size" (ionInfinite)="infiniteScroll($event)">\n                <ion-infinite-scroll-content loadingSpinner="crescent" loadingText="Carregando mais informações...">\n                </ion-infinite-scroll-content>\n            </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\conteudo-detalhes\conteudo-detalhes.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], ConteudoDetalhesPage);

//# sourceMappingURL=conteudo-detalhes.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FinanceiroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_toast__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_clipboard__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_has_no_data_has_no_data__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__boleto_visualizar_boleto_visualizar__ = __webpack_require__(216);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var FinanceiroPage = (function () {
    function FinanceiroPage(nav, noData, http, toast, clipboard, menu) {
        this.nav = nav;
        this.noData = noData;
        this.http = http;
        this.toast = toast;
        this.clipboard = clipboard;
        this.menu = menu;
        this.boletos = [];
        this.size = 3;
        this.page = 1;
        this.menu.enable(true);
    }
    FinanceiroPage.prototype.ionViewCanEnter = function () {
        this.getData(this.page, this.size);
        this.menu.enable(true);
    };
    Object.defineProperty(FinanceiroPage.prototype, "staticUserName", {
        get: function () {
            return localStorage.getItem('NomeAluno');
        },
        enumerable: true,
        configurable: true
    });
    FinanceiroPage.prototype.getData = function (page, size) {
        var _this = this;
        var token = localStorage.getItem("acessToken");
        var UID = localStorage.getItem("UsuarioID");
        var tipoUsuario = localStorage.getItem("TipoUsuario");
        if (tipoUsuario === "2") {
            UID = localStorage.getItem("AlunoID");
        }
        var url;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({});
        headers.append('Authorization', ' Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        url = 'https://api.maa.com.br/api/boleto/' + UID + '/' + page + '/' + size;
        this.http.get(url, options)
            .map(function (res) {
            var body = res.json();
            return body || {};
        })
            .subscribe(function (boletos) {
            for (var i in boletos) {
                _this.boletos.push(boletos[i]);
            }
            boletos.length > 0 ? true : _this.noData.hasNoData('Não existem cobranças.');
        }, function (err) { return console.error(err); });
    };
    FinanceiroPage.prototype.infiniteScroll = function (infiniteScrollEvent) {
        var _this = this;
        setTimeout(function () {
            _this.page++;
            _this.getData(_this.page, _this.size);
            infiniteScrollEvent.complete();
        }, 1000);
    };
    FinanceiroPage.prototype.codBarras = function (cod) {
        var _this = this;
        this.toast.show('Copiado para área de transferência', '5000', 'center')
            .subscribe(function (toast) {
            _this.clipboard.copy(cod);
        });
    };
    FinanceiroPage.prototype.enviaEmail = function (cod) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_7__boleto_visualizar_boleto_visualizar__["a" /* BoletoVisualizarPage */]);
    };
    return FinanceiroPage;
}());
FinanceiroPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-financeiro',template:/*ion-inline-start:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\financeiro\financeiro.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon id="button-menu" ios="ios-menu" md="md-menu"></ion-icon>\n        </button>\n        <ion-title>Financeiro</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <h1>Ficha Financeira</h1>\n    <ion-card *ngFor="let item of boletos" class="item-remove-animate list-grow-animation">\n        <ion-card-content>\n            <ion-card-title text-center>\n                <div *ngIf="item.Status === 1">\n                    <span class="name-description">(PAGO)</span>\n                </div>\n                <div *ngIf="item.Status === 2">\n                    <span class="name-description bolsa">(BOLSA)</span>\n                </div>\n                <br>\n                {{ item.Descricao }}\n            </ion-card-title>\n            <h3>{{ item.vencimento }}</h3>\n            <h4>Vencimento em {{ item.Vencimento }}</h4>\n            <h5>R$ {{ item.Previsto }}</h5>\n            <hr *ngIf="item.Status === 0">\n            <ion-grid *ngIf="item.Status === 0">\n                <ion-row>\n                    <ion-col col-6 col-sm>\n                        <button ion-button (click)="codBarras(item.CodBarras)">\n                            Cód. De Barras\n                        </button>\n                    </ion-col>\n                    <!-- <ion-col col-6 col-sm>\n                        <button ion-button (click)="enviaEmail(item.CodBarras)">\n                            Visualizar Boleto\n                        </button>\n                    </ion-col> -->\n                </ion-row>\n            </ion-grid>\n        </ion-card-content>\n    </ion-card>\n    <ion-infinite-scroll *ngIf="page < size" (ionInfinite)="infiniteScroll($event)">\n        <ion-infinite-scroll-content loadingSpinner="crescent" loadingText="Carregando mais informações...">\n        </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\financeiro\financeiro.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["g" /* Nav */], __WEBPACK_IMPORTED_MODULE_5__providers_has_no_data_has_no_data__["a" /* HasNoDataProvider */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_clipboard__["a" /* Clipboard */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["f" /* MenuController */]])
], FinanceiroPage);

//# sourceMappingURL=financeiro.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BoletoVisualizarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_screen_orientation__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_clipboard__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BoletoVisualizarPage = (function () {
    function BoletoVisualizarPage(toast, clipboard, navCtrl, navParams, screenOrientation, menu) {
        this.toast = toast;
        this.clipboard = clipboard;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.screenOrientation = screenOrientation;
        this.menu = menu;
        this.menu.enable(false);
    }
    BoletoVisualizarPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.toast.show('Copiado para área de transferência', '5000', 'center')
            .subscribe(function (toast) {
            _this.clipboard.copy('teste');
        });
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    };
    BoletoVisualizarPage.prototype.ionViewDidLeave = function () {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    };
    return BoletoVisualizarPage;
}());
BoletoVisualizarPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-boleto-visualizar',template:/*ion-inline-start:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\boleto-visualizar\boleto-visualizar.html"*/'<ion-header>\n    <ion-navbar>\n            <button ion-button menuToggle>\n                    <ion-icon id="button-menu" ios="ios-menu" md="md-menu"></ion-icon>\n            </button>\n            <ion-title>Boleto Visualizar</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n    <div>\n    <table width="100%" cellspacing="0" cellpadding="0" border="0">\n        <tbody>\n           <tr>\n              <td valign="BOTTOM" width="403"><img border="0" src="http://secure.maa.com.br/inicio/conta_corrente/bancos/logoNovo/logoBradesco.png" height="30">&nbsp;&nbsp;<font size="3"><b>|237-2|</b></font>\n              </td>\n              <td valign="BOTTOM" align="RIGHT"><font face="Arial, Helvetica" size="2"><b>23792.72103&nbsp;90001.278895&nbsp;91001.930006&nbsp;1&nbsp;70660000117092<b></b></b></font></td>\n           </tr>\n        </tbody>\n     </table>\n     <table width="100%" border="1" cellspacing="0" cellpadding="1">\n        <tbody>\n         <tr>\n             <td><font face="Arial, Helvetica" size="1" color="#D13D3E">&nbsp;&nbsp;&nbsp;Beneficiário</font><br>\n                <font face="Arial, Helvetica" style="font-size:10px;">&nbsp;&nbsp;&nbsp;&nbsp;COLÉGIO MAA DATAWARE<br>&nbsp;&nbsp;&nbsp;&nbsp;CNPJ:&nbsp;50012418000211\n                </font>\n             </td>\n             <td valign="top"><font face="Arial, Helvetica" size="1" color="#D13D3E">&nbsp;&nbsp;&nbsp;Agência / Código Beneficiário</font><br><font face="Arial, Helvetica" size="-1">&nbsp;\n                2121-9 / 21200-3\n                </font>\n             </td>\n             <td nowrap="" valign="top"><font face="Arial, Helvetica" size="1" color="#D13D3E">&nbsp;&nbsp;&nbsp;Data Emissão</font><br><font face="Arial, Helvetica" size="-1">&nbsp;&nbsp;28 /12/2017</font></td>\n             <td align="RIGHT" bgcolor="#CCCCCC" valign="top"><font face="Arial, Helvetica" size="1" color="#D13D3E">Vencimento&nbsp;</font><br><font face="Arial, Helvetica" size="-1"><b>30/05/2017&nbsp;</b></font></td>\n          </tr>\n \n          <tr>\n\n\n              <td><font face="Arial, Helvetica" size="1" color="#D13D3E">&nbsp;&nbsp;&nbsp;Beneficiário</font><br>\n                <font face="Arial, Helvetica" style="font-size:10px;">&nbsp;&nbsp;&nbsp;&nbsp;COLÉGIO MAA DATAWARE<br>&nbsp;&nbsp;&nbsp;&nbsp;CNPJ:&nbsp;50012418000211\n                </font>\n             </td>\n             <td valign="top"><font face="Arial, Helvetica" size="1" color="#D13D3E">&nbsp;&nbsp;&nbsp;Agência / Código Beneficiário</font><br><font face="Arial, Helvetica" size="-1">&nbsp;\n                2121-9 / 21200-3\n                </font>\n             </td>\n             <td nowrap="" valign="top"><font face="Arial, Helvetica" size="1" color="#D13D3E">&nbsp;&nbsp;&nbsp;Data Emissão</font><br><font face="Arial, Helvetica" size="-1">&nbsp;&nbsp;28 /12/2017</font></td>\n             <td align="RIGHT" bgcolor="#CCCCCC" valign="top"><font face="Arial, Helvetica" size="1" color="#D13D3E">Vencimento&nbsp;</font><br><font face="Arial, Helvetica" size="-1"><b>30/05/2017&nbsp;</b></font></td>\n             \n            <!-- <td>\n                <font face="Arial, Helvetica" size="1" color="#D13D3E">&nbsp;&nbsp;&nbsp;Pagador</font><br>\n                <font face="Arial, Helvetica" style="font-size:11px;">\n                &nbsp;&nbsp;&nbsp;JOSE WILSON DA SILVA<br>\n                &nbsp;&nbsp;&nbsp;CPF / CNPJ: 40680092811\n             </td>\n\n             <td valign="top" nowrap=""><font face="Arial, Helvetica" size="1" color="#D13D3E">&nbsp;&nbsp;&nbsp;Nosso Numero</font><br><font face="Arial, Helvetica" size="-1">&nbsp;\n                09/00012873275-9&nbsp;</font>\n             </td>\n\n             <td valign="top"><font face="Arial, Helvetica" size="1" color="#D13D3E">Núm. Documento</font><br><font face="Arial, Helvetica" size="-1">\n                12873275</font>\n             </td>\n\n             <td align="RIGHT" bgcolor="#CCCCCC" valign="top"><font face="Arial, Helvetica" size="1" color="#D13D3E">Valor do Documento</font>&nbsp;<br><font face="Arial, Helvetica" size="-1"><b>1.200,00</b></font>&nbsp;</td> -->\n             \n          </tr>\n \n          \n        </tbody>\n     </table>\n\n     <table width="100%" cellspacing="0" cellpadding="0" border="0">\n        <tbody>\n           <tr>\n              <td>\n                 <table border="0" width="100%" id="table1">\n                    <tbody>\n                       <tr>\n                          <td align="center" width="100%">\n                                <img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="3"><img src="http://secure.maa.com.br/inicio/Imagens/b.gif" height="50" width="1"><img src="http://secure.maa.com.br/inicio/Imagens/p.gif" height="50" width="1">\n                          </td>\n                       </tr>\n                    </tbody>\n                    &nbsp;\n                 </table>\n              </td>\n           </tr>\n        </tbody>\n     </table>\n    </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\boleto-visualizar\boleto-visualizar.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_clipboard__["a" /* Clipboard */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_screen_orientation__["a" /* ScreenOrientation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */]])
], BoletoVisualizarPage);

//# sourceMappingURL=boleto-visualizar.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GradePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_has_no_data_has_no_data__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GradePage = (function () {
    function GradePage(noData, http) {
        this.noData = noData;
        this.http = http;
    }
    GradePage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    Object.defineProperty(GradePage.prototype, "staticUserName", {
        get: function () {
            return localStorage.getItem('NomeAluno');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GradePage.prototype, "staticTurma", {
        get: function () {
            return localStorage.getItem('Turma');
        },
        enumerable: true,
        configurable: true
    });
    GradePage.prototype.getData = function () {
        var _this = this;
        var token = localStorage.getItem("acessToken");
        var apiUrl = 'https://api.maa.com.br/api/grade/';
        var param = localStorage.getItem("MatriculaID");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({});
        headers.append('Authorization', ' Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        this.http.get(apiUrl + param, options)
            .map(function (res) {
            var body = res.json();
            return body || {};
        }).subscribe(function (data) {
            setTimeout(function () {
                _this.aulas = data;
                data.length > 0 ? true : _this.noData.hasNoData('A grade horária não foi criada.');
            }, 1000);
        }, function (err) { return console.error(err); });
    };
    return GradePage;
}());
GradePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-grade',template:/*ion-inline-start:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\grade\grade.html"*/'<ion-header>\n        <ion-navbar>\n                <button ion-button menuToggle>\n                        <ion-icon id="button-menu" ios="ios-menu" md="md-menu"></ion-icon>\n                </button>\n                <ion-title>Grade Horária</ion-title>\n        </ion-navbar>\n</ion-header>\n<ion-content>\n        <ion-card *ngFor="let item of aulas" class="item-remove-animate list-grow-animation">\n                <ion-card-header>\n                        {{ item.DiaExtenso }}\n                </ion-card-header>\n                <ion-card-content>\n                        <ul>\n                                <li *ngFor="let data of item[\'Aulas\']">\n                                        <span>{{ data.Inicio }} ás {{ data.Final }}</span> - {{ data.Disciplina }}\n                                </li>\n                        </ul>\n                </ion-card-content>\n        </ion-card>\n</ion-content>'/*ion-inline-end:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\grade\grade.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_has_no_data_has_no_data__["a" /* HasNoDataProvider */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], GradePage);

//# sourceMappingURL=grade.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushNotificationsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_onesignal__ = __webpack_require__(338);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var apiUrl = 'https://api.maa.com.br/api/usuario';
var PushNotificationsProvider = (function () {
    function PushNotificationsProvider(http, oneSignal) {
        this.http = http;
        this.oneSignal = oneSignal;
    }
    PushNotificationsProvider.prototype.getPlayerIDOneSignal = function () {
        var _this = this;
        this.oneSignal.startInit('329166bd-0a76-4020-98c7-36eb1b013389', '904384856770');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
        this.oneSignal.handleNotificationOpened().subscribe(function (message) {
            // alert(JSON.stringify(message.notification.payload.additionalData));
        });
        this.oneSignal.getIds().then(function (res) {
            _this.createPlayerId(localStorage.getItem("UsuarioID"), res.userId);
        });
        this.oneSignal.endInit();
    };
    PushNotificationsProvider.prototype.createPlayerId = function (userId, playerId) {
        var _this = this;
        var token = localStorage.getItem("acessToken");
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({});
            headers.append('Authorization', ' Bearer ' + token);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            _this.http.post(apiUrl, "usuarioId=" + userId + "&playerId=" + playerId, {
                headers: headers
            }).
                subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    return PushNotificationsProvider;
}());
PushNotificationsProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_onesignal__["a" /* OneSignal */]])
], PushNotificationsProvider);

//# sourceMappingURL=push-notifications.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__notas_detalhes_notas_detalhes__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_has_no_data_has_no_data__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NotasPage = (function () {
    function NotasPage(noData, http, navCtrl, loadingCtrl) {
        this.noData = noData;
        this.http = http;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.getData();
    }
    Object.defineProperty(NotasPage.prototype, "staticAlunoTurma", {
        get: function () {
            return localStorage.getItem('Turma');
        },
        enumerable: true,
        configurable: true
    });
    NotasPage.prototype.getData = function () {
        var _this = this;
        var token = localStorage.getItem("acessToken");
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({});
        headers.append('Authorization', ' Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        var apiUrl = 'https://api.maa.com.br/api/periodo/';
        var param = localStorage.getItem("MatriculaID");
        var loader = this.loadingCtrl.create({
            content: "Por favor, aguarde..."
        });
        loader.present();
        console.clear();
        console.log(options);
        this.http.get(apiUrl + param, options)
            .map(function (res) {
            var body = res.json();
            return body || {};
        }).subscribe(function (data) {
            setTimeout(function () {
                _this.periodos = data;
                loader.dismiss();
                data.length > 0 ? true : _this.noData.hasNoData('Não existem notas cadastradas para esta matrícula.');
            }, 1000);
        }, function (err) { return console.error(err); });
    };
    NotasPage.prototype.openNotasDetalhes = function (event, item, desc) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__notas_detalhes_notas_detalhes__["a" /* NotasDetalhesPage */], { periodo: item, descricao: desc });
    };
    return NotasPage;
}());
NotasPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-notas',template:/*ion-inline-start:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\notas\notas.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon id="button-menu" ios="ios-menu" md="md-menu"></ion-icon>\n        </button>\n        <ion-title>Notas (Avaliações)</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <h1>Períodos</h1>\n    <ion-card>\n        <ion-card-header text-center>\n            {{staticAlunoTurma}}\n        </ion-card-header>\n        <ion-list>\n            <button ion-item *ngFor="let item of periodos" (click)="openNotasDetalhes($event, item.PeriodoId, item.Descricao)">\n                {{item.Descricao}}\n            </button>\n        </ion-list>\n    </ion-card>\n</ion-content>'/*ion-inline-end:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\notas\notas.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_has_no_data_has_no_data__["a" /* HasNoDataProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], NotasPage);

//# sourceMappingURL=notas.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotasDetalhesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NotasDetalhesPage = (function () {
    function NotasDetalhesPage(navCtrl, navParams, http, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.periodo = navParams.get("periodo");
        this.descricao = navParams.get("descricao");
        this.getData(this.periodo);
    }
    Object.defineProperty(NotasDetalhesPage.prototype, "staticTurma", {
        get: function () {
            return localStorage.getItem('Turma');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotasDetalhesPage.prototype, "staticUserName", {
        get: function () {
            return localStorage.getItem('NomeAluno');
        },
        enumerable: true,
        configurable: true
    });
    NotasDetalhesPage.prototype.getData = function (periodoId) {
        var _this = this;
        var token = localStorage.getItem("acessToken");
        var MatriculaID = localStorage.getItem("MatriculaID");
        var periodo = "&periodo=" + periodoId;
        var apiUrl = 'https://api.maa.com.br/api/notas/?id=' + MatriculaID + periodo;
        var loader = this.loadingCtrl.create({
            content: "Por favor, aguarde..."
        });
        loader.present();
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({});
        headers.append('Authorization', ' Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        this.http.get(apiUrl, options)
            .map(function (res) {
            var body = res.json();
            return body || {};
        }).subscribe(function (data) {
            setTimeout(function () {
                console.clear();
                _this.notas = data;
                console.info(data);
                loader.dismiss();
            }, 1000);
        }, function (err) { return console.error(err); });
    };
    return NotasDetalhesPage;
}());
NotasDetalhesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-notas-detalhes',template:/*ion-inline-start:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\notas-detalhes\notas-detalhes.html"*/'<ion-header>\n        <ion-navbar>\n                <button ion-button menuToggle>\n                        <ion-icon id="button-menu" ios="ios-menu" md="md-menu"></ion-icon>\n                </button>\n                <ion-title>{{descricao}}</ion-title>\n        </ion-navbar>\n</ion-header>\n<ion-content>\n        <ion-list *ngFor="let item of notas">\n                <ion-item class="item-remove-animate list-grow-animation">\n                        <p>{{item.Disciplina}}</p>\n                        <br>\n                        <h4 *ngFor="let data of item[\'NotasBoletim\']">\n                                <span class="left">{{data.Coluna}}</span>:\n                                <span [class.abaixo]="data.Abaixo">{{data.Nota}}</span>\n                        </h4>\n                </ion-item>\n        </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\notas-detalhes\notas-detalhes.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], NotasDetalhesPage);

//# sourceMappingURL=notas-detalhes.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TarefasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tarefa_detalhes_tarefa_detalhes__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_has_no_data_has_no_data__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TarefasPage = (function () {
    function TarefasPage(noData, http, navCtrl, loadingCtrl) {
        this.noData = noData;
        this.http = http;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    TarefasPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    Object.defineProperty(TarefasPage.prototype, "staticAlunoTurma", {
        get: function () {
            return localStorage.getItem('Turma');
        },
        enumerable: true,
        configurable: true
    });
    TarefasPage.prototype.getData = function () {
        var _this = this;
        var token = localStorage.getItem("acessToken");
        var param = localStorage.getItem("MatriculaID");
        var url;
        var loader = this.loadingCtrl.create({
            content: "Por favor, aguarde..."
        });
        loader.present();
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({});
        headers.append('Authorization', ' Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        url = 'https://api.maa.com.br/api/tarefas/' + param + '/disciplinas';
        this.http.get(url, options)
            .map(function (res) {
            var body = res.json();
            return body || {};
        })
            .subscribe(function (disc) {
            setTimeout(function () {
                _this.disciplinas = disc;
                loader.dismiss();
                _this.disciplinas.length > 0 ? true : _this.noData.hasNoData('Não existem tarefas cadastradas para esta matrícula.');
            }, 1000);
        }, function (err) { return console.error(err); });
    };
    TarefasPage.prototype.openTarefasDisciplina = function (event, item, desc) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__tarefa_detalhes_tarefa_detalhes__["a" /* TarefaDetalhesPage */], { id: item, descricao: desc });
    };
    return TarefasPage;
}());
TarefasPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tarefas',template:/*ion-inline-start:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\tarefas\tarefas.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon id="button-menu" ios="ios-menu" md="md-menu"></ion-icon>\n        </button>\n        <ion-title>Tarefas</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <h1>Disciplinas</h1>\n    <ion-card>\n        <ion-card-header text-center>\n            {{staticAlunoTurma}}\n        </ion-card-header>\n        <ion-list>\n            <button *ngFor="let item of disciplinas" ion-item (click)="openTarefasDisciplina($event, item.DisciplinaId, item.Disciplina)">\n                <!-- <ion-icon name="cart" item-start></ion-icon> -->\n                {{item.Disciplina}}\n            </button>\n        </ion-list>\n    </ion-card>\n</ion-content>'/*ion-inline-end:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\tarefas\tarefas.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_has_no_data_has_no_data__["a" /* HasNoDataProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], TarefasPage);

//# sourceMappingURL=tarefas.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TarefaDetalhesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TarefaDetalhesPage = (function () {
    function TarefaDetalhesPage(http, navCtrl, navParams, loadingCtrl) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.disciplinaId = navParams.get("id");
        this.descricao = navParams.get("descricao");
    }
    Object.defineProperty(TarefaDetalhesPage.prototype, "staticTurma", {
        get: function () {
            return localStorage.getItem('Turma');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TarefaDetalhesPage.prototype, "staticUserName", {
        get: function () {
            return localStorage.getItem('NomeAluno');
        },
        enumerable: true,
        configurable: true
    });
    TarefaDetalhesPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    TarefaDetalhesPage.prototype.getData = function () {
        var _this = this;
        var token = localStorage.getItem("acessToken");
        var param = localStorage.getItem("MatriculaID");
        var url;
        var loader = this.loadingCtrl.create({
            content: "Por favor, aguarde..."
        });
        loader.present();
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({});
        headers.append('Authorization', ' Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        url = 'https://api.maa.com.br/api/tarefas/' + param + '/disciplinas/' + this.disciplinaId;
        this.http.get(url, options)
            .map(function (res) {
            var body = res.json();
            return body || {};
        })
            .subscribe(function (tarefas) {
            setTimeout(function () {
                _this.tarefas = tarefas;
                console.log(_this.tarefas);
                loader.dismiss();
            }, 1000);
        }, function (err) { return console.error(err); });
    };
    return TarefaDetalhesPage;
}());
TarefaDetalhesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tarefa-detalhes',template:/*ion-inline-start:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\tarefa-detalhes\tarefa-detalhes.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon id="button-menu" ios="ios-menu" md="md-menu"></ion-icon>\n    </button>\n    <ion-title>{{descricao}}</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <div *ngFor="let item of tarefas">\n    <ion-card *ngFor="let data of item[\'TarefasItens\']">\n      <ion-card-header>\n        {{data.Entrega}}\n      </ion-card-header>\n      <ion-card-content>\n        <br>\n        <p>\n          <span>Tarefa: </span>{{data.Tarefa}}</p>\n      </ion-card-content>\n    </ion-card>\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\tarefa-detalhes\tarefa-detalhes.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], TarefaDetalhesPage);

//# sourceMappingURL=tarefa-detalhes.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OcorrenciasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_has_no_data_has_no_data__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OcorrenciasPage = (function () {
    function OcorrenciasPage(noData, http, navCtrl, navParams, loadingCtrl) {
        this.noData = noData;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
    }
    Object.defineProperty(OcorrenciasPage.prototype, "staticUserName", {
        get: function () {
            return localStorage.getItem('Nome');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OcorrenciasPage.prototype, "staticTurma", {
        get: function () {
            return localStorage.getItem('Turma');
        },
        enumerable: true,
        configurable: true
    });
    OcorrenciasPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    OcorrenciasPage.prototype.getData = function () {
        var _this = this;
        var apiUrl = 'https://api.maa.com.br/api/ocorrencia/';
        var param = localStorage.getItem("MatriculaID");
        var token = localStorage.getItem("acessToken");
        var loader = this.loadingCtrl.create({
            content: "Por favor, aguarde..."
        });
        loader.present();
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({});
        headers.append('Authorization', ' Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        this.http.get(apiUrl + param, options)
            .map(function (res) {
            var body = res.json();
            return body || {};
        }).subscribe(function (data) {
            setTimeout(function () {
                _this.ocorrencias = data;
                loader.dismiss();
                data.length > 0 ? true : _this.noData.hasNoData('Não existem ocorrências cadastradas para esta matrícula.');
            }, 1000);
        }, function (err) { return console.error(err); });
    };
    return OcorrenciasPage;
}());
OcorrenciasPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-ocorrencias',template:/*ion-inline-start:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\ocorrencias\ocorrencias.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon id="button-menu" ios="ios-menu" md="md-menu"></ion-icon>\n    </button>\n    <ion-title>Ocorrências do aluno</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-list>\n    <ion-card>\n      <ion-card-content>\n        <ion-card-title>\n          Turma:\n          <span class="name-description">{{ staticTurma }}</span>\n        </ion-card-title>\n      </ion-card-content>\n    </ion-card>\n    <ion-card *ngFor="let item of ocorrencias">\n      <ion-card-header>\n        {{ item.Disciplina }}\n      </ion-card-header>\n      <ion-card-content *ngFor="let data of item[\'Ocorrencias\']">\n        <p>\n          <strong>Data:</strong> {{ data.Data }}</p>\n        <p>\n          <strong>Tipo:</strong> {{ data.Tipo }}</p>\n        <p>\n          <strong>Descrição:</strong> {{ data.OcorrenciaDesc }}</p>\n        <hr>\n      </ion-card-content>\n    </ion-card>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\ocorrencias\ocorrencias.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_has_no_data_has_no_data__["a" /* HasNoDataProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], OcorrenciasPage);

//# sourceMappingURL=ocorrencias.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IntroPage = (function () {
    function IntroPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.skipMsg = 'Pular';
        this.state = 'x';
    }
    IntroPage.prototype.skip = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
        localStorage.setItem("IntroduccionViewed", JSON.stringify(true));
    };
    IntroPage.prototype.slideChanged = function () {
        if (this.slides.isEnd()) {
            this.skipMsg = 'Tudo bem, entendido!';
        }
    };
    IntroPage.prototype.slideMoved = function () {
        if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex()) {
            this.state = 'rightSwipe';
        }
        else {
            this.state = 'leftSwipe';
        }
    };
    IntroPage.prototype.animationDone = function () {
        this.state = 'x';
    };
    return IntroPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */])
], IntroPage.prototype, "slides", void 0);
IntroPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-intro',template:/*ion-inline-start:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\intro\intro.html"*/'<ion-content>\n  <ion-slides pager (ionSlideDidChange)="slideChanged()" (ionSlideDrag)="slideMoved()">\n    <ion-slide>\n      <div class="diag" style="background: url(\'assets/img/whitebg.svg\') no-repeat">\n        <ion-icon ios="ios-heart" md="md-heart" color="primary" [@bounce]=\'state\' (@bounce.done)="animationDone()"></ion-icon>\n      </div>\n      <div [@bounce]=\'state\'>\n        <h2>Seja Bem-Vindo(a)</h2>\n        <p>Obrigado por baixar nosso app. Com ele agora você pode obter suas informações de forma fácil na palma da sua mão.</p>\n      </div>\n    </ion-slide>\n    <ion-slide>\n      <div class="diag" style="background: url(\'assets/img/whitebg.svg\') no-repeat">\n        <ion-icon ios="ios-paper-plane" md="md-paper-plane" color="primary" [@bounce]=\'state\'></ion-icon>\n      </div>\n      <div [@bounce]=\'state\'>\n        <h2>Fique por dentro</h2>\n        <p>Consulte suas notas, faltas, tarefas, conteúdos, histórico de pagamento, segunda via de cobrança e muito mais.</p>\n      </div>\n    </ion-slide>\n    <ion-slide>\n      <div class="diag" style="background: url(\'assets/img/whitebg.svg\') no-repeat">\n        <ion-icon ios="ios-warning" md="md-warning" color="primary" [@bounce]=\'state\'></ion-icon>\n      </div>\n      <div [@bounce]=\'state\'>\n        <h2>Atenção</h2>\n        <p>O fornecimento do acesso (Login/Senha) é feito pela secretaria, caso não possua entre em contato.</p>\n      </div>\n    </ion-slide>\n  </ion-slides>\n  <button (click)="skip()" id="skip">{{ skipMsg }}</button>\n</ion-content>'/*ion-inline-end:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\intro\intro.html"*/,
        animations: [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_33" /* trigger */])('bounce', [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* state */])('*', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* style */])({
                    transform: 'translateX(0)'
                })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_32" /* transition */])('* => rightSwipe', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])('700ms ease-out', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_25" /* keyframes */])([
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* style */])({
                        transform: 'translateX(0)',
                        offset: 0
                    }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* style */])({
                        transform: 'translateX(-65px)',
                        offset: .3
                    }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* style */])({
                        transform: 'translateX(0)',
                        offset: 1
                    })
                ]))),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_32" /* transition */])('* => leftSwipe', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])('700ms ease-out', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_25" /* keyframes */])([
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* style */])({
                        transform: 'translateX(0)',
                        offset: 0
                    }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* style */])({
                        transform: 'translateX(65px)',
                        offset: .3
                    }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* style */])({
                        transform: 'translateX(0)',
                        offset: 1
                    })
                ])))
            ])
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
], IntroPage);

//# sourceMappingURL=intro.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MensagensPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MensagensPage = (function () {
    function MensagensPage(http) {
        this.http = http;
        this.mensagens = [];
        this.size = 3;
        this.page = 1;
    }
    MensagensPage.prototype.ionViewDidEnter = function () {
        this.getData(this.page, this.size);
    };
    MensagensPage.prototype.getData = function (page, size) {
        var _this = this;
        var token = localStorage.getItem("acessToken");
        var apiUrl = 'https://api.maa.com.br/api/avisos/' + localStorage.getItem("UsuarioID") + '/' + page + '/' + size;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({});
        headers.append('Authorization', ' Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        this.http.get(apiUrl, options)
            .map(function (res) {
            var body = res.json();
            return body || {};
        })
            .subscribe(function (data) {
            for (var i in data) {
                _this.mensagens.push(data[i]);
            }
        }, function (err) {
            console.error(err);
        });
    };
    MensagensPage.prototype.infiniteScroll = function (infiniteScrollEvent) {
        var _this = this;
        setTimeout(function () {
            _this.page++;
            _this.getData(_this.page, _this.size);
            infiniteScrollEvent.complete();
        }, 1000);
    };
    return MensagensPage;
}());
MensagensPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-mensagens',template:/*ion-inline-start:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\mensagens\mensagens.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n      <ion-icon id="button-menu" ios="ios-menu" md="md-menu"></ion-icon>\n    </button>\n        <ion-title>Mensagens</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <div>\n        <ion-card *ngFor="let msg of mensagens">\n            <ion-card-header>\n                {{ msg.Titulo }}\n            </ion-card-header>\n            <ion-card-content>\n                <br>\n                <p>\n                    <span>Mensagem: </span>{{ msg.Mensagem }}</p>\n                <p><span>Data: </span> {{ msg.Data | date: \'dd/MM/yyyy\'}}</p>\n                <p><span>Por: </span>{{ msg.Por }}</p>\n            </ion-card-content>\n        </ion-card>\n    </div>\n    <ion-infinite-scroll *ngIf="page < size" (ionInfinite)="infiniteScroll($event)">\n        <ion-infinite-scroll-content loadingSpinner="crescent" loadingText="Carregando mais informações...">\n        </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\pages\mensagens\mensagens.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], MensagensPage);

//# sourceMappingURL=mensagens.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);



Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_20" /* enableProdMode */])();
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HasNoDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HasNoDataProvider = (function () {
    function HasNoDataProvider(alert) {
        this.alert = alert;
    }
    HasNoDataProvider.prototype.hasNoData = function (message) {
        var alert = this.alert.create({
            message: message,
            buttons: [{
                    text: 'OK',
                    role: 'ok'
                }
            ]
        });
        alert.present();
    };
    return HasNoDataProvider;
}());
HasNoDataProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], HasNoDataProvider);

//# sourceMappingURL=has-no-data.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_dados_dados__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_conteudo_conteudo__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_financeiro_financeiro__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_grade_grade__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_notas_notas__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_tarefas_tarefas__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_matriculas_matriculas__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_ocorrencias_ocorrencias__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_login_login__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_intro_intro__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_notas_detalhes_notas_detalhes__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_tarefa_detalhes_tarefa_detalhes__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_conteudo_detalhes_conteudo_detalhes__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_mensagens_mensagens__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_splash_screen__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_header_color__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_toast__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser_animations__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_storage__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_clipboard__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_status_bar__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_network__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_auth_service_auth_service__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_has_no_data_has_no_data__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_push_notifications_push_notifications__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_onesignal__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_menu_options_menu_options__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_boleto_visualizar_boleto_visualizar__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_screen_orientation__ = __webpack_require__(217);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



































var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_dados_dados__["a" /* DadosPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_conteudo_conteudo__["a" /* ConteudoPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_financeiro_financeiro__["a" /* FinanceiroPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_grade_grade__["a" /* GradePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_notas_notas__["a" /* NotasPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_tarefas_tarefas__["a" /* TarefasPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_intro_intro__["a" /* IntroPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_matriculas_matriculas__["a" /* MatriculasPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_ocorrencias_ocorrencias__["a" /* OcorrenciasPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_notas_detalhes_notas_detalhes__["a" /* NotasDetalhesPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_tarefa_detalhes_tarefa_detalhes__["a" /* TarefaDetalhesPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_conteudo_detalhes_conteudo_detalhes__["a" /* ConteudoDetalhesPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_mensagens_mensagens__["a" /* MensagensPage */],
            __WEBPACK_IMPORTED_MODULE_33__pages_boleto_visualizar_boleto_visualizar__["a" /* BoletoVisualizarPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_24__ionic_storage__["a" /* IonicStorageModule */].forRoot({
                name: '__mydb',
                driverOrder: ['indexeddb', 'sqlite', 'websql']
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_dados_dados__["a" /* DadosPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_conteudo_conteudo__["a" /* ConteudoPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_financeiro_financeiro__["a" /* FinanceiroPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_grade_grade__["a" /* GradePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_notas_notas__["a" /* NotasPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_tarefas_tarefas__["a" /* TarefasPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_intro_intro__["a" /* IntroPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_matriculas_matriculas__["a" /* MatriculasPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_ocorrencias_ocorrencias__["a" /* OcorrenciasPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_notas_detalhes_notas_detalhes__["a" /* NotasDetalhesPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_tarefa_detalhes_tarefa_detalhes__["a" /* TarefaDetalhesPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_conteudo_detalhes_conteudo_detalhes__["a" /* ConteudoDetalhesPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_mensagens_mensagens__["a" /* MensagensPage */],
            __WEBPACK_IMPORTED_MODULE_33__pages_boleto_visualizar_boleto_visualizar__["a" /* BoletoVisualizarPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_20__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_toast__["a" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_25__ionic_native_clipboard__["a" /* Clipboard */],
            __WEBPACK_IMPORTED_MODULE_27__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_28__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_21__ionic_native_header_color__["a" /* HeaderColor */],
            __WEBPACK_IMPORTED_MODULE_26__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_29__providers_has_no_data_has_no_data__["a" /* HasNoDataProvider */],
            __WEBPACK_IMPORTED_MODULE_30__providers_push_notifications_push_notifications__["a" /* PushNotificationsProvider */],
            __WEBPACK_IMPORTED_MODULE_31__ionic_native_onesignal__["a" /* OneSignal */],
            __WEBPACK_IMPORTED_MODULE_32__providers_menu_options_menu_options__["a" /* MenuOptionsProvider */],
            __WEBPACK_IMPORTED_MODULE_34__ionic_native_screen_orientation__["a" /* ScreenOrientation */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_header_color__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_dados_dados__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_conteudo_conteudo__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_financeiro_financeiro__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_grade_grade__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_home_home__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_login__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_notas_notas__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_tarefas_tarefas__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_matriculas_matriculas__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_ocorrencias_ocorrencias__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_intro_intro__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_mensagens_mensagens__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_menu_options_menu_options__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_auth_service_auth_service__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var MyApp = (function () {
    function MyApp(statusBar, authService, menuOptions, platform, network, splashScreen, alertCtrl, headerColor) {
        this.statusBar = statusBar;
        this.authService = authService;
        this.menuOptions = menuOptions;
        this.platform = platform;
        this.network = network;
        this.splashScreen = splashScreen;
        this.alertCtrl = alertCtrl;
        this.headerColor = headerColor;
        this.token = localStorage.getItem('acessToken');
        this.splash = true;
        this.initializeApp();
    }
    Object.defineProperty(MyApp.prototype, "staticUserName", {
        get: function () {
            return localStorage.getItem('NomeAluno');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyApp.prototype, "staticMatriculaID", {
        get: function () {
            return localStorage.getItem('MatriculaID');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyApp.prototype, "staticAlunoID", {
        get: function () {
            return localStorage.getItem('AlunoID');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyApp.prototype, "staticTurma", {
        get: function () {
            return localStorage.getItem('Turma');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyApp.prototype, "staticFoto", {
        get: function () {
            return localStorage.getItem('UrlFoto');
        },
        enumerable: true,
        configurable: true
    });
    MyApp.prototype.menuOpened = function () {
        this.createMenu();
    };
    MyApp.prototype.menuClosed = function () {
        this.createMenu();
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready()
            .then(function () {
            _this.headerColor.tint('#0099cc');
            _this.statusBar.overlaysWebView(false);
            _this.statusBar.backgroundColorByHexString('#0099cc');
            _this.splashScreen.hide();
            setTimeout(function () {
                _this.splash = false;
            }, 4000);
            _this.network.onDisconnect()
                .subscribe(function () {
                _this.noInternetConnection();
            });
            if (!JSON.parse(localStorage.getItem("IntroduccionViewed"))) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_16__pages_intro_intro__["a" /* IntroPage */];
            }
            else {
                if (localStorage.getItem("Email") && localStorage.getItem("Password")) {
                    _this.authService.postData(localStorage.getItem("Email"), localStorage.getItem("Password"))
                        .then(function (result) {
                        setTimeout(function () {
                            _this.resposeData = result;
                            localStorage.setItem('acessToken', _this.resposeData.access_token);
                            localStorage.setItem('UsuarioID', _this.resposeData.UsuarioID);
                            localStorage.setItem('TipoUsuario', _this.resposeData.TipoUsuario);
                            localStorage.setItem('Nome', _this.resposeData.Nome);
                            localStorage.setItem('EmpresaID', _this.resposeData.EmpresaID);
                            _this.rootPage = __WEBPACK_IMPORTED_MODULE_14__pages_matriculas_matriculas__["a" /* MatriculasPage */];
                            _this.createMenu();
                        }, 1000);
                    }, function (err) {
                        err.status === 400 ? _this.rootPage = __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */] : console.error(err);
                    });
                }
                else {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */];
                    _this.createMenu();
                }
            }
        });
    };
    MyApp.prototype.createMenu = function () {
        var _this = this;
        this.menuOptions.buildMenuButtons(localStorage.getItem('UsuarioID') === null ? 0 : localStorage.getItem('UsuarioID')).subscribe(function (data) {
            _this.pages = [{
                    title: 'Home',
                    component: __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
                    icon: 'home',
                    active: true,
                    name: 'Home'
                },
                {
                    title: 'Grade de aulas',
                    component: __WEBPACK_IMPORTED_MODULE_9__pages_grade_grade__["a" /* GradePage */],
                    icon: 'calendar',
                    active: data.Grade,
                    name: 'Grade'
                },
                {
                    title: 'Mensagens',
                    component: __WEBPACK_IMPORTED_MODULE_17__pages_mensagens_mensagens__["a" /* MensagensPage */],
                    icon: 'chatbubbles',
                    active: true,
                    name: 'Mensagem'
                }, {
                    title: 'Matrículas',
                    component: __WEBPACK_IMPORTED_MODULE_14__pages_matriculas_matriculas__["a" /* MatriculasPage */],
                    icon: 'construct',
                    active: true,
                    name: 'Matricula'
                },
                {
                    title: 'Ocorrências',
                    component: __WEBPACK_IMPORTED_MODULE_15__pages_ocorrencias_ocorrencias__["a" /* OcorrenciasPage */],
                    icon: 'briefcase',
                    active: data.Ocorrencias,
                    name: 'Ocorrencia'
                },
                {
                    title: 'Financeiro',
                    component: __WEBPACK_IMPORTED_MODULE_8__pages_financeiro_financeiro__["a" /* FinanceiroPage */],
                    icon: 'cash',
                    active: data.Financeiro,
                    name: 'Financeiro'
                },
                {
                    title: 'Tarefas',
                    component: __WEBPACK_IMPORTED_MODULE_13__pages_tarefas_tarefas__["a" /* TarefasPage */],
                    icon: 'create',
                    active: data.Tarefas,
                    name: 'Tarefas'
                },
                {
                    title: 'Notas',
                    component: __WEBPACK_IMPORTED_MODULE_12__pages_notas_notas__["a" /* NotasPage */],
                    icon: 'school',
                    active: data.Notas,
                    name: 'Notas'
                },
                {
                    title: 'Conteúdo Programático',
                    component: __WEBPACK_IMPORTED_MODULE_7__pages_conteudo_conteudo__["a" /* ConteudoPage */],
                    icon: 'attach',
                    active: data.Conteudo,
                    name: 'Conteudo'
                },
                {
                    title: 'Confira seus dados',
                    component: __WEBPACK_IMPORTED_MODULE_6__pages_dados_dados__["a" /* DadosPage */],
                    icon: 'contact',
                    active: data.Dados,
                    name: 'Dados'
                }
            ];
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
        this.activePage = page;
    };
    MyApp.prototype.checkActivePage = function (page) {
        return page === this.activePage;
    };
    MyApp.prototype.noInternetConnection = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: 'Detectamos que você está sem conexão no momento, o aplicativo será fechado :(',
            buttons: [{
                    text: 'Ok',
                    handler: function () {
                        _this.platform.exitApp();
                    }
                }]
        });
        alert.present();
    };
    MyApp.prototype.logout = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: 'Deseja realmente sair do app?',
            buttons: [{
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Sair',
                    handler: function () {
                        localStorage.clear();
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */]);
                    }
                }
            ]
        });
        alert.present();
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\app\app.html"*/'<div id="custom-overlay" [style.display]="splash ? \'flex\': \'none\'">\n  <div class="flb" style="text-align: center;">\n    <div class="Aligner-item Aligner-item--top"></div>\n    <img src="assets/logo.svg">\n    <div class="Aligner-item Aligner-item--bottom"></div>\n  </div>\n</div>\n<ion-menu [content]="content"  (ionOpen)="menuOpened()" (ionClose)="menuClosed()" side="left" class="menu-material" id="menu-material">\n  <ion-content>\n    <div class="menu-header">\n      <!--material-design-background-->\n      <img width="100" class="user-avatar round" src="{{staticFoto}}" onerror="this.src=\'assets/img/avatar/avatar.png\'" />\n      <p class="name">{{staticUserName}}</p>\n      <p class="e-mail">{{staticTurma}}</p>\n    </div>\n    <ion-list no-lines>\n      <div *ngFor="let p of pages">\n        <button [class.active]="checkActivePage(p)" *ngIf="p.active" id="{{p.name}}" menuClose="left" ion-item detail-none (click)="openPage(p)">\n          <ion-icon [name]="p.icon" item-left></ion-icon>\n          {{p.title}}\n        </button>\n      </div>\n      <button menuClose="left" ion-item detail-none (click)="logout()">\n        <ion-icon name="log-out" item-left></ion-icon>\n        Sair\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="true"></ion-nav>'/*ion-inline-end:"C:\Users\Marco Nogueira\Documents\maya-mobile-v1\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_19__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_18__providers_menu_options_menu_options__["a" /* MenuOptionsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_header_color__["a" /* HeaderColor */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 222,
	"./af.js": 222,
	"./ar": 223,
	"./ar-dz": 224,
	"./ar-dz.js": 224,
	"./ar-kw": 225,
	"./ar-kw.js": 225,
	"./ar-ly": 226,
	"./ar-ly.js": 226,
	"./ar-ma": 227,
	"./ar-ma.js": 227,
	"./ar-sa": 228,
	"./ar-sa.js": 228,
	"./ar-tn": 229,
	"./ar-tn.js": 229,
	"./ar.js": 223,
	"./az": 230,
	"./az.js": 230,
	"./be": 231,
	"./be.js": 231,
	"./bg": 232,
	"./bg.js": 232,
	"./bn": 233,
	"./bn.js": 233,
	"./bo": 234,
	"./bo.js": 234,
	"./br": 235,
	"./br.js": 235,
	"./bs": 236,
	"./bs.js": 236,
	"./ca": 237,
	"./ca.js": 237,
	"./cs": 238,
	"./cs.js": 238,
	"./cv": 239,
	"./cv.js": 239,
	"./cy": 240,
	"./cy.js": 240,
	"./da": 241,
	"./da.js": 241,
	"./de": 242,
	"./de-at": 243,
	"./de-at.js": 243,
	"./de-ch": 244,
	"./de-ch.js": 244,
	"./de.js": 242,
	"./dv": 245,
	"./dv.js": 245,
	"./el": 246,
	"./el.js": 246,
	"./en-au": 247,
	"./en-au.js": 247,
	"./en-ca": 248,
	"./en-ca.js": 248,
	"./en-gb": 249,
	"./en-gb.js": 249,
	"./en-ie": 250,
	"./en-ie.js": 250,
	"./en-nz": 251,
	"./en-nz.js": 251,
	"./eo": 252,
	"./eo.js": 252,
	"./es": 253,
	"./es-do": 254,
	"./es-do.js": 254,
	"./es.js": 253,
	"./et": 255,
	"./et.js": 255,
	"./eu": 256,
	"./eu.js": 256,
	"./fa": 257,
	"./fa.js": 257,
	"./fi": 258,
	"./fi.js": 258,
	"./fo": 259,
	"./fo.js": 259,
	"./fr": 260,
	"./fr-ca": 261,
	"./fr-ca.js": 261,
	"./fr-ch": 262,
	"./fr-ch.js": 262,
	"./fr.js": 260,
	"./fy": 263,
	"./fy.js": 263,
	"./gd": 264,
	"./gd.js": 264,
	"./gl": 265,
	"./gl.js": 265,
	"./gom-latn": 266,
	"./gom-latn.js": 266,
	"./he": 267,
	"./he.js": 267,
	"./hi": 268,
	"./hi.js": 268,
	"./hr": 269,
	"./hr.js": 269,
	"./hu": 270,
	"./hu.js": 270,
	"./hy-am": 271,
	"./hy-am.js": 271,
	"./id": 272,
	"./id.js": 272,
	"./is": 273,
	"./is.js": 273,
	"./it": 274,
	"./it.js": 274,
	"./ja": 275,
	"./ja.js": 275,
	"./jv": 276,
	"./jv.js": 276,
	"./ka": 277,
	"./ka.js": 277,
	"./kk": 278,
	"./kk.js": 278,
	"./km": 279,
	"./km.js": 279,
	"./kn": 280,
	"./kn.js": 280,
	"./ko": 281,
	"./ko.js": 281,
	"./ky": 282,
	"./ky.js": 282,
	"./lb": 283,
	"./lb.js": 283,
	"./lo": 284,
	"./lo.js": 284,
	"./lt": 285,
	"./lt.js": 285,
	"./lv": 286,
	"./lv.js": 286,
	"./me": 287,
	"./me.js": 287,
	"./mi": 288,
	"./mi.js": 288,
	"./mk": 289,
	"./mk.js": 289,
	"./ml": 290,
	"./ml.js": 290,
	"./mr": 291,
	"./mr.js": 291,
	"./ms": 292,
	"./ms-my": 293,
	"./ms-my.js": 293,
	"./ms.js": 292,
	"./my": 294,
	"./my.js": 294,
	"./nb": 295,
	"./nb.js": 295,
	"./ne": 296,
	"./ne.js": 296,
	"./nl": 297,
	"./nl-be": 298,
	"./nl-be.js": 298,
	"./nl.js": 297,
	"./nn": 299,
	"./nn.js": 299,
	"./pa-in": 300,
	"./pa-in.js": 300,
	"./pl": 301,
	"./pl.js": 301,
	"./pt": 302,
	"./pt-br": 303,
	"./pt-br.js": 303,
	"./pt.js": 302,
	"./ro": 304,
	"./ro.js": 304,
	"./ru": 305,
	"./ru.js": 305,
	"./sd": 306,
	"./sd.js": 306,
	"./se": 307,
	"./se.js": 307,
	"./si": 308,
	"./si.js": 308,
	"./sk": 309,
	"./sk.js": 309,
	"./sl": 310,
	"./sl.js": 310,
	"./sq": 311,
	"./sq.js": 311,
	"./sr": 312,
	"./sr-cyrl": 313,
	"./sr-cyrl.js": 313,
	"./sr.js": 312,
	"./ss": 314,
	"./ss.js": 314,
	"./sv": 315,
	"./sv.js": 315,
	"./sw": 316,
	"./sw.js": 316,
	"./ta": 317,
	"./ta.js": 317,
	"./te": 318,
	"./te.js": 318,
	"./tet": 319,
	"./tet.js": 319,
	"./th": 320,
	"./th.js": 320,
	"./tl-ph": 321,
	"./tl-ph.js": 321,
	"./tlh": 322,
	"./tlh.js": 322,
	"./tr": 323,
	"./tr.js": 323,
	"./tzl": 324,
	"./tzl.js": 324,
	"./tzm": 325,
	"./tzm-latn": 326,
	"./tzm-latn.js": 326,
	"./tzm.js": 325,
	"./uk": 327,
	"./uk.js": 327,
	"./ur": 328,
	"./ur.js": 328,
	"./uz": 329,
	"./uz-latn": 330,
	"./uz-latn.js": 330,
	"./uz.js": 329,
	"./vi": 331,
	"./vi.js": 331,
	"./x-pseudo": 332,
	"./x-pseudo.js": 332,
	"./yo": 333,
	"./yo.js": 333,
	"./zh-cn": 334,
	"./zh-cn.js": 334,
	"./zh-hk": 335,
	"./zh-hk.js": 335,
	"./zh-tw": 336,
	"./zh-tw.js": 336
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 445;

/***/ })

},[346]);
//# sourceMappingURL=main.js.map