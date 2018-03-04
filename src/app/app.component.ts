import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import 'rxjs/add/operator/map';
import { LokasiProvider } from '../providers/lokasi/lokasi';

import { TabsPage } from '../pages/tabs/tabs';
// import { PengaturanProfilPage } from '../pages/pengaturan-profil/pengaturan-profil';
// import { FareadDetailPage } from '../pages/faread-detail/faread-detail';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage; 

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private lokasiProvider:LokasiProvider
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.lokasiProvider.watchLocation(1000);
      setTimeout(() =>{
          this.lokasiProvider.findKota();
      }, 1000)
    });
  }
}
