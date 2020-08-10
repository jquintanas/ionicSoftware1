import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { NologinGuard } from "./core/guards/nologin.guard";

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
    canActivate: [AuthGuard],
  },
  {
    path: "carrito-compras",
    loadChildren: () =>
      import("./pages/carrito-compras/carrito-compras.module").then(
        (m) => m.CarritoComprasPageModule
      ),
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
  },
  {
    path: "historial",
    loadChildren: () =>
      import("./pages/historial/historial.module").then(
        (m) => m.HistorialPageModule
      ),
      canActivate: [AuthGuard],
  },
  {
    path: "perfil-usuario",
    loadChildren: () =>
      import("./pages/perfil-usuario/perfil-usuario.module")
        .then((m) => m.PerfilUsuarioPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "editar-perfil",
    loadChildren: () =>
      import("./pages/editar-perfil/editar-perfil.module").then(
        (m) => m.EditarPerfilPageModule
      ),
    canActivate: [AuthGuard],
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
    loadChildren: () => import('./pages/pedido/pedido.module').then(m => m.PedidoPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'telefono',
    loadChildren: () => import('./pages/telefono/telefono.module').then(m => m.TelefonoPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'preguntas-frecuentes',
    loadChildren: () => import('./pages/preguntas-frecuentes/preguntas-frecuentes.module').then(m => m.PreguntasFrecuentesPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'novedad',
    loadChildren: () => import('./pages/novedad/novedad.module').then(m => m.NovedadPageModule),
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
