import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { HeaderColor } from '@ionic-native/header-color';

import { DadosPage } from '../pages/dados/dados';
import { ConteudoPage } from '../pages/conteudo/conteudo';
import { FinanceiroPage } from '../pages/financeiro/financeiro';
import { GradePage } from '../pages/grade/grade';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { NotasPage } from '../pages/notas/notas';
import { TarefasPage } from '../pages/tarefas/tarefas';
import { MatriculasPage } from '../pages/matriculas/matriculas';
import { OcorrenciasPage } from '../pages/ocorrencias/ocorrencias';
import { IntroPage } from '../pages/intro/intro';
import { MensagensPage } from '../pages/mensagens/mensagens';
import { MenuOptionsProvider } from '../providers/menu-options/menu-options';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@Component({
	templateUrl: 'app.html'
})

export class MyApp {
	@ViewChild(Nav) nav: Nav;
	token: string = localStorage.getItem('acessToken');
	rootPage: any;
	activePage: any;

	resposeData: any;

	pages: Array<{
		title: string
		, component: any
		, icon: string
		, active: boolean
		, name: string
	}>;

	splash = true;

	get staticUserName() {
		return localStorage.getItem('NomeAluno');
	}

	get staticMatriculaID() {
		return localStorage.getItem('MatriculaID');
	}

	get staticAlunoID() {
		return localStorage.getItem('AlunoID');
	}

	get staticTurma() {
		return localStorage.getItem('Turma');
	}

	get staticFoto() {
		return localStorage.getItem('UrlFoto');
	}

	constructor(private statusBar: StatusBar, public authService: AuthServiceProvider, public menuOptions: MenuOptionsProvider, public platform: Platform, private network: Network
		, public splashScreen: SplashScreen, private alertCtrl: AlertController, private headerColor: HeaderColor) {

		this.initializeApp();
	}


	menuOpened(){
		this.createMenu();
	}

	menuClosed(){
		this.createMenu();
	}

	initializeApp() {
		this.platform.ready()
			.then(() => {				
				this.headerColor.tint('#0099cc');
				this.statusBar.overlaysWebView(false);
				this.statusBar.backgroundColorByHexString('#0099cc');

				this.splashScreen.hide();

				setTimeout(() => {
					this.splash = false;
				}, 4000);

				this.network.onDisconnect()
					.subscribe(() => {
						this.noInternetConnection();
					});

				if (!JSON.parse(localStorage.getItem("IntroduccionViewed"))) {
					this.rootPage = IntroPage;
				} else {
					if (localStorage.getItem("Email") && localStorage.getItem("Password")) {
						this.authService.postData(localStorage.getItem("Email"), localStorage.getItem("Password"))
							.then((result) => {
								setTimeout(() => {
									this.resposeData = result;
									localStorage.setItem('acessToken', this.resposeData.access_token);
									localStorage.setItem('UsuarioID', this.resposeData.UsuarioID);
									localStorage.setItem('TipoUsuario', this.resposeData.TipoUsuario);
									localStorage.setItem('Nome', this.resposeData.Nome);	
									localStorage.setItem('EmpresaID', this.resposeData.EmpresaID);								
									this.rootPage = MatriculasPage;		
									this.createMenu();
								}, 1000);
							}, (err) => {
								err.status === 400 ? this.rootPage = LoginPage : console.error(err)
							});
					} else {
						this.rootPage = LoginPage;
						this.createMenu();
					}
				}
			});
	}

	createMenu() {
		this.menuOptions.buildMenuButtons(localStorage.getItem('UsuarioID') === null ? 0 : localStorage.getItem('UsuarioID')).subscribe(data => {
			this.pages = [{
				title: 'Home'
				, component: HomePage
				, icon: 'home'
				, active: true
				, name: 'Home'
			}
				, {
				title: 'Grade de aulas'
				, component: GradePage
				, icon: 'calendar'
				, active: data.Grade
				, name: 'Grade'
			}
				, {
				title: 'Mensagens'
				, component: MensagensPage
				, icon: 'chatbubbles'
				, active: true
				, name: 'Mensagem'
			}, {
				title: 'Matrículas'
				, component: MatriculasPage
				, icon: 'construct'
				, active: true
				, name: 'Matricula'
			}
				, {
				title: 'Ocorrências'
				, component: OcorrenciasPage
				, icon: 'briefcase'
				, active: data.Ocorrencias
				, name: 'Ocorrencia'
			}
				, {
				title: 'Financeiro'
				, component: FinanceiroPage
				, icon: 'cash'
				, active: data.Financeiro
				, name: 'Financeiro'
			}
				, {
				title: 'Tarefas'
				, component: TarefasPage
				, icon: 'create'
				, active: data.Tarefas
				, name: 'Tarefas'
			}
				, {
				title: 'Notas'
				, component: NotasPage
				, icon: 'school'
				, active: data.Notas
				, name: 'Notas'
			}
				, {
				title: 'Conteúdo Programático'
				, component: ConteudoPage
				, icon: 'attach'
				, active: data.Conteudo
				, name: 'Conteudo'
			}
				, {
				title: 'Confira seus dados'
				, component: DadosPage
				, icon: 'contact'
				, active: data.Dados
				, name: 'Dados'
			}
			];	
		});
	}

	openPage(page) {
		this.nav.setRoot(page.component);
		this.activePage = page;
	}

	public checkActivePage(page): boolean{
		return page === this.activePage;
	}

	noInternetConnection() {
		let alert = this.alertCtrl.create({
			message: 'Detectamos que você está sem conexão no momento, o aplicativo será fechado :('
			, buttons: [{
				text: 'Ok'
				, handler: () => {
					this.platform.exitApp();
				}
			}]
		});
		alert.present();
	}

	logout() {
		let alert = this.alertCtrl.create({
			message: 'Deseja realmente sair do app?'
			, buttons: [{
				text: 'Cancelar'
				, role: 'cancel'
				, handler: () => {
					console.log('Cancel clicked');
				}
			}
				, {
				text: 'Sair'
				, handler: () => {
					localStorage.clear();
					this.nav.setRoot(LoginPage);
				}
			}
			]
		});
		alert.present();
	}
}
