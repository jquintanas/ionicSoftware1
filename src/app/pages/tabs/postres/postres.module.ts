import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostresPageRoutingModule } from './postres-routing.module';

import { PostresPage } from './postres.page';
import { CommonsComponentsModule } from "src/app/components/commons-components.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostresPageRoutingModule,
    CommonsComponentsModule
  ],
  declarations: [PostresPage]
})
export class PostresPageModule {}
