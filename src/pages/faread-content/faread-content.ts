import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FareadDetailPage } from '../faread-detail/faread-detail';

/**
 * Generated class for the FareadContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faread-content',
  templateUrl: 'faread-content.html',
})
export class FareadContentPage {	
	content:string;
  contentTitle:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	let parContent = navParams.get('content');
  	if( parContent == 1)
  	{
  		this.content = "002-open-book.png";
      this.contentTitle ="Panduan Musafir";
  	}
  	else if(parContent == 2)
  	{
  		this.content = "prayer.png";
      this.contentTitle ="Doa Perjalanan";
  	}
  	else if(parContent = 3)
  	{
  		this.content = "001-quran.png";
      this.contentTitle ="Fiqh & Dalil";
  	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FareadContentPage');
  }
  gotoDetailPage()
  {
    this.navCtrl.push(FareadDetailPage);
  }
  

}
