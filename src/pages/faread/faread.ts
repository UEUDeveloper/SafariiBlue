import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FareadContentPage } from '../faread-content/faread-content';

/**
 * Generated class for the FareadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faread',
  templateUrl: 'faread.html',
})
export class FareadPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FareadPage');
  }

  gotoContentPage(content: number){
  	/*
	content = 1 => Panduan Musafir
	content = 2 => Doa Perjalanan
	content = 2 => Fiqh & Dalil

  	*/
  	this.navCtrl.push(FareadContentPage,{ content : content });
  }

}
