import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Favoritos } from "src/app/interface/favoritosStorage";
import { FavoritosService } from "src/app/services/cart/favoritos.service";
import { LoadingController } from '@ionic/angular';

@Component({
  selector: "app-perfil-usuario",
  templateUrl: "./perfil-usuario.page.html",
  styleUrls: ["./perfil-usuario.page.scss"],
})
export class PerfilUsuarioPage implements OnInit {
  @Input("Favorito") banderaCorazon: boolean;
  // data = [];
  dataBebidas: any[];
  // dataDulces: any[];
  // dataPostres: any[];
  // dataTortas: any[];
  // dataPromociones: any[];
  // tmp0 = [];
  // tmp1 = [];
  // tmp2 = [];
  // tmp4 = [];
  // tmp5 = [];

  constructor(private router: Router, private favoritos: FavoritosService, private loadingController: LoadingController) {

  }

  async ngOnInit() {
    await this.cargarDatos();
  }

  segment: string;

  ionViewWillEnter() {
    this.segment = "bebidas";
    this.banderaCorazon = true;
  }

  segmentChanged(ev: any) {
    console.log("Segment changed", ev);
  }

  abrirEdicion() {
    this.router.navigateByUrl("editar-perfil");
  }

  zoomImage() {
    console.log("jhvvnbvn");
    //this.photoViewer.show('../../assets/imagen/user.png');
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
    let loading = await this.loadingController.create({message: "Actualizando..."});
    await loading.present();
    if(!event){
      await this.cargarDatos();
    }
    loading.dismiss();
  }
}
