import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceRecomendationPage } from './place-recomendation';

@NgModule({
  declarations: [
    PlaceRecomendationPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceRecomendationPage),
  ],
})
export class PlaceRecomendationPageModule {}
