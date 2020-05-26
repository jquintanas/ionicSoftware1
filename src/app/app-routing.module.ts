import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'bebidas',
    loadChildren: () => import('./pages/tabs/bebidas/bebidas.module').then( m => m.BebidasPageModule)
  },
  {
    path: 'dulces',
    loadChildren: () => import('./pages/tabs/dulces/dulces.module').then( m => m.DulcesPageModule)
  },
  {
    path: 'postres',
    loadChildren: () => import('./pages/tabs/postres/postres.module').then( m => m.PostresPageModule)
  },
  {
    path: 'tortas',
    loadChildren: () => import('./pages/tabs/tortas/tortas.module').then( m => m.TortasPageModule)
  },
  {
    path: 'promociones',
    loadChildren: () => import('./pages/tabs/promociones/promociones.module').then( m => m.PromocionesPageModule)
  },
  {
    path: 'detalles-productos',
    loadChildren: () => import('./pages/detalles-productos/detalles-productos.module').then( m => m.DetallesProductosPageModule)
  },
  {
    path: 'carrito-compras',
    loadChildren: () => import('./pages/carrito-compras/carrito-compras.module').then( m => m.CarritoComprasPageModule)
  },
  {
    path: 'rastreo',
    loadChildren: () => import('./rastreo/rastreo.module').then( m => m.RastreoPageModule)
  },
  {
    path: 'historial-compras',
    loadChildren: () => import('./historial-compras/historial-compras.module').then( m => m.HistorialComprasPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },  {
    path: 'mapa-mapbox',
    loadChildren: () => import('./pages/mapa-mapbox/mapa-mapbox.module').then( m => m.MapaMapboxPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
