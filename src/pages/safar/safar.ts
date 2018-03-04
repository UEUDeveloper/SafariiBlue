import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerjalananPage } from '../perjalanan/perjalanan';
import { NearbyPage } from '../nearby/nearby';
import { PlaceRecomendationPage } from '../place-recomendation/place-recomendation';
import { KiblatPage } from '../kiblat/kiblat';
import { JadwalSholatPage } from '../jadwal-sholat/jadwal-sholat';

import { TanggalProvider } from '../../providers/tanggal/tanggal';
import { LokasiProvider } from '../../providers/lokasi/lokasi';
import { Observable } from 'rxjs/Rx';

/**
 * Generated class for the SafarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-safar',
  templateUrl: 'safar.html',
})
export class SafarPage {
  jam:string;
  namaKota:string;
  lat:any;
  long:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public tanggalProvider:TanggalProvider,
    public lokasiProvider:LokasiProvider) {
    this.jam = this.tanggalProvider.getJam();
    this.namaKota='-';
    this.lat = 0;
    this.long = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafarPage');
    this.runTime();

  }

  runTime()
  {
    Observable.interval(5000).subscribe(() =>{
      this.tanggalProvider.refreshTanggal();
      this.jam = this.tanggalProvider.getJam();
      console.log(this.jam);
      this.namaKota = this.lokasiProvider.getNamaKota();
      if(this.namaKota == '-')
        this.lokasiProvider.findKota();
      this.lat = this.lokasiProvider.getLocation().lat;
      this.long = this.lokasiProvider.getLocation().long;
    });
  }

  gotoPerjalanan()
  {
    this.navCtrl.push(PerjalananPage);
  }
  gotoNearby()
  {
    this.navCtrl.push(NearbyPage);
  }
  gotoPlaceRecomendation()
  {
    this.navCtrl.push(PlaceRecomendationPage);
  }
  gotoKiblat()
  {
    this.navCtrl.push(KiblatPage);
  }
  gotoJadwalSholat()
  {
  	this.navCtrl.push(JadwalSholatPage);
  }

}
