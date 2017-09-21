import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CgpCalculatorPage } from './cgp-calculator';

@NgModule({
  declarations: [
    CgpCalculatorPage,
  ],
  imports: [
    IonicPageModule.forChild(CgpCalculatorPage),
  ],
})
export class CgpCalculatorPageModule {}
