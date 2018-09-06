import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { DadosPage } from '../pages/dados/dados';
import { ConteudoPage } from '../pages/conteudo/conteudo';
import { FinanceiroPage } from '../pages/financeiro/financeiro';
import { GradePage } from '../pages/grade/grade';
import { HomePage } from '../pages/home/home';
import { NotasPage } from '../pages/notas/notas';
import { TarefasPage } from '../pages/tarefas/tarefas';
import { MatriculasPage } from '../pages/matriculas/matriculas';
import { OcorrenciasPage } from '../pages/ocorrencias/ocorrencias';
import { LoginPage } from '../pages/login/login';
import { IntroPage } from '../pages/intro/intro';
import { NotasDetalhesPage } from '../pages/notas-detalhes/notas-detalhes';
import { TarefaDetalhesPage } from '../pages/tarefa-detalhes/tarefa-detalhes';
import { ConteudoDetalhesPage } from '../pages/conteudo-detalhes/conteudo-detalhes';
import { MensagensPage } from '../pages/mensagens/mensagens';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from '@ionic-native/header-color';
import { Toast } from '@ionic-native/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage';
import { Clipboard } from '@ionic-native/clipboard';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HasNoDataProvider } from '../providers/has-no-data/has-no-data';
import { PushNotificationsProvider } from '../providers/push-notifications/push-notifications';
import { OneSignal } from '@ionic-native/onesignal';
import { MenuOptionsProvider } from '../providers/menu-options/menu-options';
import { BoletoVisualizarPage } from '../pages/boleto-visualizar/boleto-visualizar';

import { ScreenOrientation } from '@ionic-native/screen-orientation';

@NgModule({
    declarations: [
        MyApp,
        DadosPage,
        ConteudoPage,
        FinanceiroPage,
        GradePage,
        HomePage,
        NotasPage,
        TarefasPage,
        LoginPage,
        IntroPage,
        MatriculasPage,
        OcorrenciasPage,
        NotasDetalhesPage,
        TarefaDetalhesPage,
        ConteudoDetalhesPage,
        MensagensPage,
        BoletoVisualizarPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        BrowserAnimationsModule,
        HttpModule,
        IonicStorageModule.forRoot({
            name: '__mydb',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        DadosPage,
        ConteudoPage,
        FinanceiroPage,
        GradePage,
        HomePage,
        NotasPage,
        TarefasPage,
        LoginPage,
        IntroPage,
        MatriculasPage,
        OcorrenciasPage,
        NotasDetalhesPage,
        TarefaDetalhesPage,
        ConteudoDetalhesPage,
        MensagensPage,
        BoletoVisualizarPage
    ],
    providers: [
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        Toast,
        Clipboard,
        Network,
        AuthServiceProvider,
        HeaderColor,
        StatusBar,
        HasNoDataProvider,
        PushNotificationsProvider,
        OneSignal,
        MenuOptionsProvider,
        ScreenOrientation
    ]
})
export class AppModule { }