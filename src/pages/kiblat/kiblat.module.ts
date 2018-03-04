import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KiblatPage } from './kiblat';

@NgModule({
  declarations: [
    KiblatPage,
  ],
  imports: [
    IonicPageModule.forChild(KiblatPage),
  ],
})
export class KiblatPageModule {}
