import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TortasPage } from './tortas.page';

const routes: Routes = [
  {
    path: '',
    component: TortasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TortasPageRoutingModule {}
