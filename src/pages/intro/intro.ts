import { Component, ViewChild, trigger, transition, style, state, animate, keyframes } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
    selector: 'page-intro',
    templateUrl: 'intro.html',
    animations: [

        trigger('bounce', [
            state('*', style({
                transform: 'translateX(0)'
            })),
            transition('* => rightSwipe', animate('700ms ease-out', keyframes([
                style({
                    transform: 'translateX(0)',
                    offset: 0
                }),
                style({
                    transform: 'translateX(-65px)',
                    offset: .3
                }),
                style({
                    transform: 'translateX(0)',
                    offset: 1
                })
            ]))),
            transition('* => leftSwipe', animate('700ms ease-out', keyframes([
                style({
                    transform: 'translateX(0)',
                    offset: 0
                }),
                style({
                    transform: 'translateX(65px)',
                    offset: .3
                }),
                style({
                    transform: 'translateX(0)',
                    offset: 1
                })
            ])))
        ])
    ]
})
export class IntroPage {

  @ViewChild(Slides) slides: Slides;
    skipMsg = 'Pular';
    state = 'x';

    constructor(public navCtrl: NavController) {

    }

    skip() {
        this.navCtrl.push(LoginPage);
        localStorage.setItem("IntroduccionViewed", JSON.stringify(true));
    }

    slideChanged() {
        if (this.slides.isEnd()) {
            this.skipMsg = 'Tudo bem, entendido!';
        }
    }

    slideMoved() {
        if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex()) {
            this.state = 'rightSwipe';
        } else {
            this.state = 'leftSwipe';
        }
    }

    animationDone() {
        this.state = 'x';
    }

}
