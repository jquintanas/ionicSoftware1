import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DulcesPage } from './dulces.page';

const routes: Routes = [
  {
    path: '',
    component: DulcesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DulcesPageRoutingModule {}
