import { Component, OnInit } from '@angular/core';
import { environment } from "src/environments/environment";
import { DetalleProducto } from 'src/app/core/interface/productoDetalle';
@Component({
  selector: 'app-slider-recomendados',
  templateUrl: './slider-recomendados.component.html',
  styleUrls: ['./slider-recomendados.component.scss'],
})
export class SliderRecomendadosComponent implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: false,
    setWrapperSize: true,
    slidesPerView: 1.5
  };
  dataBebidas: DetalleProducto[] = [
    {
      ImagenP: "https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg",
      Titulo: "jugo de fresa",
      Descripcion: "Un jugo muy rico de fresa.",
      Precio: 10,
      Favorito: false,
      carrusel: [
        "https://recetasfacil.online/wp-content/uploads/2018/06/postres-sin-horno-1.jpg",
        "https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg",
        "https://i2.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/06/tapa_bebidas.png?fit=700%2C336&ssl=1&resize=1280%2C720"],
      id: "1",
      categoria: environment.codigoCategoriaPromociones
    },
    {
      ImagenP: "",
      Titulo: "",
      Descripcion: "vino tinto muy rico.",
      Precio: 0,
      Favorito: true,
      carrusel: [
        "https://recetasfacil.online/wp-content/uploads/2018/06/postres-sin-horno-1.jpg",
        "https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg",
        "https://i2.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/06/tapa_bebidas.png?fit=700%2C336&ssl=1&resize=1280%2C720"],
      id: "2",
      categoria: environment.codigoCategoriaPromociones
    },
    {
      ImagenP: "https://i2.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/06/tapa_bebidas.png?fit=700%2C336&ssl=1&resize=1280%2C720",
      Titulo: "limonada",
      Descripcion: "",
      Precio: 2.5,
      Favorito: false,
      carrusel: [
        "https://recetasfacil.online/wp-content/uploads/2018/06/postres-sin-horno-1.jpg",
        "https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg",
        "https://i2.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/06/tapa_bebidas.png?fit=700%2C336&ssl=1&resize=1280%2C720"],
      id: "3",
      categoria: environment.codigoCategoriaPromociones
    }
  ];

  constructor() { }

  ngOnInit() { }

}
