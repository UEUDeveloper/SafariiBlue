import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// native package
import { HTTP } from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

// main page
import { TabsPage } from '../pages/tabs/tabs';
import { SafarPage } from '../pages/safar/safar';
import { FareadPage } from '../pages/faread/faread';
import { BantuanPage } from '../pages/bantuan/bantuan';
import { PengaturanPage } from '../pages/pengaturan/pengaturan';
import { PerjalananPage } from '../pages/perjalanan/perjalanan';
// safar
import { NearbyPage } from '../pages/nearby/nearby';
import { PlaceRecomendationPage } from '../pages/place-recomendation/place-recomendation';
import { KiblatPage } from '../pages/kiblat/kiblat';
import { JadwalSholatPage } from '../pages/jadwal-sholat/jadwal-sholat';
// start
import { StartPage } from '../pages/start/start';
import { LoginPage } from '../pages/login/login';
import { DaftarPage } from '../pages/daftar/daftar';
// faread
import { FareadContentPage } from '../pages/faread-content/faread-content';
import { FareadDetailPage } from '../pages/faread-detail/faread-detail';
// pengaturan
import { PengaturanDonasiPage } from '../pages/pengaturan-donasi/pengaturan-donasi';
import { PengaturanFiqhPage } from '../pages/pengaturan-fiqh/pengaturan-fiqh';
import { PengaturanIklanPage } from '../pages/pengaturan-iklan/pengaturan-iklan';
import { PengaturanKebijakanPage } from '../pages/pengaturan-kebijakan/pengaturan-kebijakan';
import { PengaturanPerjalananPage } from '../pages/pengaturan-perjalanan/pengaturan-perjalanan';
import { PengaturanProfilPage } from '../pages/pengaturan-profil/pengaturan-profil';
import { PengaturanStatusPage } from '../pages/pengaturan-status/pengaturan-status';
import { PengaturanTemaPage } from '../pages/pengaturan-tema/pengaturan-tema';
import { PengaturanTentangPage } from '../pages/pengaturan-tentang/pengaturan-tentang';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// providers
import { WaktuSholatProvider } from '../providers/waktu-sholat/waktu-sholat';
import { TanggalProvider } from '../providers/tanggal/tanggal';
import { LokasiProvider } from '../providers/lokasi/lokasi';
import { ToolsProvider } from '../providers/tools/tools';

@NgModule({
  declarations: [
    MyApp,
    SafarPage,
    FareadPage,
    BantuanPage,
    PengaturanPage,
    PerjalananPage,
    NearbyPage,
    PlaceRecomendationPage,
    KiblatPage,
    JadwalSholatPage,
    StartPage,
    DaftarPage,
    LoginPage,
    FareadContentPage,
    FareadDetailPage,
    PengaturanDonasiPage,
    PengaturanFiqhPage,
    PengaturanIklanPage,
    PengaturanKebijakanPage,
    PengaturanPerjalananPage,
    PengaturanProfilPage,
    PengaturanStatusPage,
    PengaturanTemaPage,
    PengaturanTentangPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{tabsHideOnSubPages: true}),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SafarPage,
    FareadPage,
    BantuanPage,
    PengaturanPage,
    PerjalananPage,
    NearbyPage,
    PlaceRecomendationPage,
    KiblatPage,
    JadwalSholatPage,
    StartPage,
    DaftarPage,
    LoginPage,
    FareadContentPage,
    FareadDetailPage,
    PengaturanDonasiPage,
    PengaturanFiqhPage,
    PengaturanIklanPage,
    PengaturanKebijakanPage,
    PengaturanPerjalananPage,
    PengaturanProfilPage,
    PengaturanStatusPage,
    PengaturanTemaPage,
    PengaturanTentangPage,
    TabsPage
  ],
  providers: [
    HTTP,
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WaktuSholatProvider,
    TanggalProvider,
    LokasiProvider,
    ToolsProvider
  ]
})
export class AppModule {}
