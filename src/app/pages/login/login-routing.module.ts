import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    children: [
      {
        path: 'registro',
        children: [
          {
            path: '',
            loadChildren: () => import("./../registro/registro.module").then(m => m.RegistroPageModule)
          }
        ]
      },
      {
        path: 'recuperar-contraseña',
        children: [
          {
            path: '',
            loadChildren: () => import("./../recuperar-contrasena/recuperar-contrasena.module").then(m => m.RecuperarContrasenaPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
