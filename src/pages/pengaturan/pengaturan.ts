import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PengaturanDonasiPage } from '../pengaturan-donasi/pengaturan-donasi';
import { PengaturanFiqhPage } from '../pengaturan-fiqh/pengaturan-fiqh';
import { PengaturanIklanPage } from '../pengaturan-iklan/pengaturan-iklan';
import { PengaturanKebijakanPage } from '../pengaturan-kebijakan/pengaturan-kebijakan';
import { PengaturanPerjalananPage } from '../pengaturan-perjalanan/pengaturan-perjalanan';
import { PengaturanProfilPage } from '../pengaturan-profil/pengaturan-profil';
import { PengaturanStatusPage } from '../pengaturan-status/pengaturan-status';
import { PengaturanTemaPage } from '../pengaturan-tema/pengaturan-tema';
import { PengaturanTentangPage } from '../pengaturan-tentang/pengaturan-tentang';

/**
 * Generated class for the PengaturanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pengaturan',
  templateUrl: 'pengaturan.html',
})
export class PengaturanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PengaturanPage');
  }
  gotoDonasi()
  {
    this.navCtrl.push(PengaturanDonasiPage);
  }
  gotoFiqh()
  {
    this.navCtrl.push(PengaturanFiqhPage);
  }
  gotoIklan()
  {
    this.navCtrl.push(PengaturanIklanPage);
  }
  gotoKebijakan()
  {
    this.navCtrl.push(PengaturanKebijakanPage);
  }
  gotoPerjalanan()
  {
    this.navCtrl.push(PengaturanPerjalananPage);
  }
  gotoStatus()
  {
    this.navCtrl.push(PengaturanStatusPage);
  }
  gotoTema()
  {
    this.navCtrl.push(PengaturanTemaPage);
  }
  gotoTentang()
  {
    this.navCtrl.push(PengaturanTentangPage);
  }
  gotoProfil()
  {
    this.navCtrl.push(PengaturanProfilPage);
  }

}
