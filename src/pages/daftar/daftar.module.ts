import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DaftarPage } from './daftar';

@NgModule({
  declarations: [
    DaftarPage,
  ],
  imports: [
    IonicPageModule.forChild(DaftarPage),
  ],
})
export class DaftarPageModule {}
