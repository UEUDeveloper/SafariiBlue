import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { DaftarPage } from '../daftar/daftar';

/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

  gotoLogin()
  {
    this.app.getRootNav().setRoot(LoginPage);
  }

  gotoDaftar()
  {
    this.app.getRootNav().setRoot(DaftarPage);
  }

}
