import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RastreoPageRoutingModule } from './rastreo-routing.module';

import { RastreoPage } from './rastreo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RastreoPageRoutingModule
  ],
  declarations: [RastreoPage]
})
export class RastreoPageModule {}
