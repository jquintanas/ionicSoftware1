import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { Favoritos } from "src/app/interface/favoritosStorage";
import { environment } from "src/environments/environment";
import { FavoritosService } from "src/app/services/cart/favoritos.service";

@Component({
  selector: "app-perfil-usuario",
  templateUrl: "./perfil-usuario.page.html",
  styleUrls: ["./perfil-usuario.page.scss"],
})
export class PerfilUsuarioPage implements OnInit {
  @Input("Favorito") banderaCorazon: boolean;
  data=[];
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

  constructor(private router: Router, private storage: Storage, private favoritos: FavoritosService) {
    //this.mostrarFavorito();
    
  }

  //async 
  ngOnInit() {
    //return this.mostrarFavorito()
    /*
    let favMap: Map<string, Map<string, Favoritos>>;
    await this.favoritos.obtenerFavoritos().then((data:any) => {
      favMap = data;
      console.log("primero")
    });
    console.log("segundo")
    console.log(favMap);
    let lista;
    if(favMap!= null){
      lista = this.favoritos.convertirMapaALista(favMap);
    }
    
    console.log(lista)
    this.dataBebidas = lista;*/
    // this.favoritos.observadorFavoritos().subscribe(async (data:boolean)=>{
    //   await this.favoritos.obtenerFavoritos().then((Map:any)=>{
    //     favMap= Map;
    //   })
    //  this.data.push(this.favoritos.convertirMapaALista(favMap))
    // })

    this.storage

    console.log(this.data)
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
    console.log("Holitas")
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
