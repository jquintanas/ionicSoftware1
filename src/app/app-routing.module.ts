import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoginPage } from './../app/pages/login/login.page';
import { AuthGuard } from "./guards/auth.guard";
import { NologinGuard } from "./guards/nologin.guard"

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module")
      .then((m) => m.HomePageModule),
      canActivate: [AuthGuard],
  },
  {
    path: "detalles-productos",
    loadChildren: () =>
      import("./pages/detalles-productos/detalles-productos.module").then(
        (m) => m.DetallesProductosPageModule
      ),
  },
  {
    path: "carrito-compras",
    loadChildren: () =>
      import("./pages/carrito-compras/carrito-compras.module").then(
        (m) => m.CarritoComprasPageModule
      ),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
      canActivate: [NologinGuard],
    },
  {
    path: "registro",
    loadChildren: () =>
      import("./pages/registro/registro.module").then(
        (m) => m.RegistroPageModule
      ),
  },
  {
    path: "recuperar-contrasena",
    loadChildren: () =>
      import("./pages/recuperar-contrasena/recuperar-contrasena.module").then(
        (m) => m.RecuperarContrasenaPageModule
      ),
  },
  {
    path: "mapa-mapbox",
    loadChildren: () =>
      import("./pages/mapa-mapbox/mapa-mapbox.module").then(
        (m) => m.MapaMapboxPageModule
      ),
  },
  {
    path: "historial",
    loadChildren: () =>
      import("./pages/historial/historial.module").then(
        (m) => m.HistorialPageModule
      ),
  },
  {
    path: "perfil-usuario",
    loadChildren: () =>
      import("./pages/perfil-usuario/perfil-usuario.module").then(
        (m) => m.PerfilUsuarioPageModule
      ),
  },
  {
    path: "editar-perfil",
    loadChildren: () =>
      import("./pages/editar-perfil/editar-perfil.module").then(
        (m) => m.EditarPerfilPageModule
      ),
  },
  {
    path: "cambio-contrasena",
    loadChildren: () =>
      import("./pages/cambio-contrasena/cambio-contrasena.module").then(
        (m) => m.CambioContrasenaPageModule
      ),
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pages/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'telefono',
    loadChildren: () => import('./pages/telefono/telefono.module').then( m => m.TelefonoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
