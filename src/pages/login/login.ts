import { Component } from '@angular/core';
import { NavController, LoadingController, MenuController } from 'ionic-angular';
import { MatriculasPage } from '../matriculas/matriculas';
import { AuthServiceProvider } from 	'../../providers/auth-service/auth-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Toast } from '@ionic-native/toast';
import { MenuOptionsProvider } from '../../providers/menu-options/menu-options'
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

	private login: FormGroup;

	resposeData: any;

		constructor(public menuOptions: MenuOptionsProvider, public toast: Toast, public menu: MenuController, public loadingCtrl: LoadingController, public navCtrl: NavController, public authService: AuthServiceProvider, private formBuilder: FormBuilder) {
			this.menu.enable(false);
			
			this.login = this.formBuilder.group({
				username: ['', Validators.email],
				password: ['', Validators.required],
				rememberMe: ['']
			  });
		}

		submit()
		{
			const loader = this.loadingCtrl.create({
				content: 'Por favor, aguarde...'
			});
			loader.present();

			this.authService.postData(this.login.value.username , this.login.value.password)
			.then((result) => {
				setTimeout(() => {
				this.resposeData = result;
				localStorage.setItem('acessToken', this.resposeData.access_token);
				localStorage.setItem('UsuarioID', this.resposeData.UsuarioID);
				localStorage.setItem('TipoUsuario', this.resposeData.TipoUsuario);
				localStorage.setItem('Nome', this.resposeData.Nome);

				localStorage.setItem('EmpresaID', this.resposeData.EmpresaID);

				localStorage.setItem("Email", this.login.value.username);
				localStorage.setItem("Password", this.login.value.password);

				this.navCtrl.setRoot(MatriculasPage);
				loader.dismiss();
			}, 1000);

			}, (err) => {				
				loader.dismiss();				
				err.status === 400 ? this.failed() : console.error(err)
			});
		}


		failed()
		{
			this.toast.show('E-mail ou Senha inválidos', '5000', 'center').subscribe(
				toast => {});
		}
		

	}