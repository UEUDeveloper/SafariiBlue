import { Component, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LokasiProvider } from '../../providers/lokasi/lokasi';

/**
 * Generated class for the PerjalananPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-perjalanan',
  templateUrl: 'perjalanan.html',
})
export class PerjalananPage {
// maps attribute
  @ViewChild('map') mapElement: ElementRef;
  map: any;
	start:any;
  constructor(public navCtrl: NavController, 
  		public navParams: NavParams,
		public lokasiProvider:LokasiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerjalananPage');
  }
  setStart(newStart:string)
  {
  	this.start = newStart;
  }
  startInputFocus()
  {
      var input = document.getElementById('start').getElementsByTagName('input')[0];
      let autocomplete = this.lokasiProvider.autoComplete(input);
      autocomplete.addListener('place_changed', () =>{
        var place = autocomplete.getPlace();
        this.setStart(place.formatted_address);
        if (!place.geometry) {
          alert("No details available for input: '" + place.name + "'");
        return;
      }
      });
  }

}
