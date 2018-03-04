import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PengaturanProfilPage } from './pengaturan-profil';

@NgModule({
  declarations: [
    PengaturanProfilPage,
  ],
  imports: [
    IonicPageModule.forChild(PengaturanProfilPage),
  ],
})
export class PengaturanProfilPageModule {}
