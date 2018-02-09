import { Component } from '@angular/core';

import { SafarPage } from '../safar/safar';
import { FareadPage } from '../faread/faread';
import { BantuanPage } from '../bantuan/bantuan';
import { PengaturanPage } from '../pengaturan/pengaturan';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SafarPage;
  tab2Root = FareadPage;
  tab3Root = BantuanPage;
  tab4Root = PengaturanPage;

  constructor() {

  }
}
