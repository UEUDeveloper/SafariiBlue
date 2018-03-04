import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PengaturanStatusPage } from './pengaturan-status';

@NgModule({
  declarations: [
    PengaturanStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(PengaturanStatusPage),
  ],
})
export class PengaturanStatusPageModule {}
