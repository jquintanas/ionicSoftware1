import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { Favoritos } from "src/app/interface/favoritosStorage";
import { environment } from "src/environments/environment";
//import {FavoritoService} from "src/app/services/favorito/favorito.service"

@Component({
  selector: "app-perfil-usuario",
  templateUrl: "./perfil-usuario.page.html",
  styleUrls: ["./perfil-usuario.page.scss"],
})
export class PerfilUsuarioPage implements OnInit {
  @Input("Favorito") banderaCorazon: boolean;
  
  dataBebidas: any[];
  dataDulces: any[];
  dataPostres: any[];
  dataTortas: any[];
  dataPromociones: any[];
  tmp0 = [];
  tmp1 = [];
  tmp2 = [];
  tmp4 = [];
  tmp5 = [];

  constructor(private router: Router, private storage: Storage) {
    this.mostrarFavorito();

  }

  ngOnInit() {
    //return this.mostrarFavorito()
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

  mostrarFavorito() {
    //console.log("AQUI SE MUESTRAN LOS FAVORITOS!")
      this.storage
      .get(environment.codigoFavoritos)
      .then((data) => {
        data.map((favorito) => {
          if (!("url" in favorito)) {
            favorito.url = "/assets/img/404.jpg";
          }

          if (favorito.url === "") {
            favorito.url = "/assets/img/404.jpg";
          }
          //console.log(favorito)

          if (favorito.categoria === 0) {
            this.tmp0.push(favorito);
            // console.log(favorito)
          }

          if (favorito.categoria === 1) {
            this.tmp1.push(favorito);
          }

          if (favorito.categoria === 2) {
            this.tmp2.push(favorito);
          }

          if (favorito.categoria === 4) {
            this.tmp4.push(favorito);
          }

          if (favorito.categoria === 5) {
            this.tmp5.push(favorito);
          }
        });

        this.dataBebidas = this.tmp0;
        this.dataDulces = this.tmp1;
        this.dataPostres = this.tmp2;
        this.dataTortas = this.tmp4;
        this.dataPromociones = this.tmp5;
        console.log("this.dataBebidas ",this.dataBebidas)
        console.log("this.dataDulces ",this.dataDulces)
        console.log("this.dataPostres ",this.dataPostres)
        console.log("this.dataTortas ",this.dataTortas)
        console.log("this.dataPromociones ",this.dataPromociones)
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  private EstaEnFavoritos(data: Favoritos[], producto: Favoritos) {
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].categoria == producto.categoria &&
        data[i].idProducto == producto.idProducto
      ) {
        return true;
      }
    }
    return false;
  }
}
