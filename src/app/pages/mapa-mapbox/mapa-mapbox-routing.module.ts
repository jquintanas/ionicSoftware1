import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaMapboxPage } from './mapa-mapbox.page';

const routes: Routes = [
  {
    path: '',
    component: MapaMapboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaMapboxPageRoutingModule {}
