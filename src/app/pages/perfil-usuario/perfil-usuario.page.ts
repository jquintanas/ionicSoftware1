import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Favoritos } from "src/app/core/interface/favoritosStorage";
import { FavoritosService } from "src/app/core/services/cart/favoritos.service";
import { LoadingController, AlertController } from "@ionic/angular";
import { IonContent } from "@ionic/angular";
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { UserInfoService } from 'src/app/core/services/userInfo/user-info.service';

@Component({
  selector: "app-perfil-usuario",
  templateUrl: "./perfil-usuario.page.html",
  styleUrls: ["./perfil-usuario.page.scss"],
})
export class PerfilUsuarioPage implements OnInit {
  @Input("Favorito") banderaCorazon: boolean;

  @ViewChild(IonContent, { static: true }) content: IonContent;
  dataBebidas: any[];
  userName: string = "";

  constructor(
    private router: Router,
    private favoritos: FavoritosService,
    private loadingController: LoadingController,
    private authService: AuthService,
    public alertService: AlertsService,
    private userInfo: UserInfoService
  ) { }

  abrirHistorial() {
    this.router.navigateByUrl("historial");
  }

  abrirPreguntasFrecuentes() {
    this.router.navigateByUrl("preguntas-frecuentes");
  }

  abrirNovedad() {
    this.router.navigateByUrl("novedad");
  }

  async ngOnInit() {
    await this.cargarDatos();
    this.userName = this.userInfo.usuario + " " + this.userInfo.apellido;
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
  //TODO corregir carga de datos
  private async cargarDatos() {
    let favMap: Map<string, Map<string, Favoritos>>;
    // await this.favoritos.obtenerFavoritos().then((data: any) => {
    //   favMap = data;
    // });
    let lista;
    // if (favMap != null) {
    //   lista = this.favoritos.convertirMapaALista(favMap);
    // }
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

  logout() {
    this.authService.logout();
  }

  mostrarCuentasBancarias() {
    this.alertService.alert("Cuentas Bancarias",
      '<p class="title"><strong>Banco Pichincha</strong></p>' +
      '<p class="p">Cuenta de Ahorros #45789657479  FARID ALVARADO CI:1207684521 Omiypali@gmail.com <br></p>' +
      '<p class="title"><strong>Banco Guayaquil</strong></p>' +
      '<p class="p">Cuenta de Ahorros #45789657479  FARID ALVARADO CI:1207684521 Omiypali@gmail.com <br></p>' +
      '<p class="comentario">Envíanos una foto del comprobante del depósito/transferencia para confirmar tu ' +
      'pedido al 0955744347<br> </p>');
  }
}
