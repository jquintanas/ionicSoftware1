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

/**
 * @classdesc Container class of User Profile.
 * @desc Creation Date: 08/20/2020
 * @class
 * @public
 * @version 1.0.0
 * @author Francesca Man Ging <fman@espol.edu.ec>
 */

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
    this.userName = this.userInfo.usuario;
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
    await this.favoritos.obtenerFavoritosLista().then(
      dt => {
        this.dataBebidas = dt;
      }
    ).catch(
      err => {
        console.log(err);
        this.dataBebidas = [];
      }
    );
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
      '<p class="p">Cuenta Corriente #3461150804 SANDRA ZAMORA CI:1201750377 Omiypali@gmail.com <br></p>' +
      '<p class="comentario">Envíanos una foto del comprobante del depósito/transferencia para confirmar tu ' +
      'pedido al 0955744347 o al 0994807723<br> </p>');
  }
}
