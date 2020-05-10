import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'bebidas',
        children: [
          {
            path: '',
            loadChildren: () => import("./../tabs/bebidas/bebidas.module").then(m => m.BebidasPageModule)
          }
        ]
      },
      {
        path: 'dulces',
        children: [
          {
            path: '',
            loadChildren: () => import("./../tabs/dulces/dulces.module").then(m => m.DulcesPageModule)
          }
        ]
      },
      {
        path: 'postres',
        children: [
          {
            path: '',
            loadChildren: () => import("./../tabs/postres/postres.module").then(m => m.PostresPageModule)
          }
        ]
      },
      {
        path: 'tortas',
        children: [
          {
            path: '',
            loadChildren: () => import("./../tabs/tortas/tortas.module").then(m => m.TortasPageModule)
          }
        ]
      },
      {
        path: 'promociones',
        children: [
          {
            path: '',
            loadChildren: () => import("./../tabs/promociones/promociones.module").then(m => m.PromocionesPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'bebidas',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
