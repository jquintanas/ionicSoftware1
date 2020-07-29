import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Favoritos } from "src/app/core/interface/favoritosStorage";
import { FavoritosService } from "src/app/core/services/cart/favoritos.service";
import { LoadingController } from "@ionic/angular";
import { IonContent } from "@ionic/angular";
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: "app-perfil-usuario",
  templateUrl: "./perfil-usuario.page.html",
  styleUrls: ["./perfil-usuario.page.scss"],
})
export class PerfilUsuarioPage implements OnInit {
  @Input("Favorito") banderaCorazon: boolean;

  @ViewChild(IonContent, { static: true }) content: IonContent;
  dataBebidas: any[];

  constructor(
    private router: Router,
    private favoritos: FavoritosService,
    private loadingController: LoadingController,
    private authService: AuthService
  ) { }

  abrirHistorial() {
    this.router.navigateByUrl("historial");
  }

  async ngOnInit() {
    await this.cargarDatos();
  }

  ionViewWillEnter() {
    this.banderaCorazon = true;
  }

  abrirEdicion() {
    this.router.navigateByUrl("editar-perfil");
  }

  zoomImage() {
    console.log("ZoomImage");
  }

  private async cargarDatos() {
    let favMap: Map<string, Map<string, Favoritos>>;
    await this.favoritos.obtenerFavoritos().then((data: any) => {
      favMap = data;
    });
    let lista;
    if (favMap != null) {
      lista = this.favoritos.convertirMapaALista(favMap);
    }
    this.dataBebidas = lista;
  }

  async actualizarPantalla(event: any) {
    const loading = await this.loadingController.create({
      message: "Actualizando...",
    });
    await loading.present();
    if (!event) {
      await this.cargarDatos();
    }
    loading.dismiss();
  }

  logout(){
    this.authService.logout()
  }
}
