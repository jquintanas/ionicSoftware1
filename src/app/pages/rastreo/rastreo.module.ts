import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RastreoPageRoutingModule } from './rastreo-routing.module';

import { CommonsComponentsModule } from "src/app/components/commons-components.module";
import { RastreoPage } from './rastreo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RastreoPageRoutingModule,
    CommonsComponentsModule 
  ],
  declarations: [RastreoPage]
})
export class RastreoPageModule {}
