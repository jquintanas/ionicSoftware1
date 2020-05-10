import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.page.html',
  styleUrls: ['./bebidas.page.scss'],
})
export class BebidasPage implements OnInit {

  constructor() { }
  dataBebidas = [
    {
      Imagen: "https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg",
      Titulo: "Jugo de fresa",
      Descripcion: "Un jugo muy rico de fresa.",
      Precio: 10,
      Favorito: false,
      esPar: false
    },
    {
      Imagen: "",
      Titulo: "",
      Descripcion: "Vino tinto muy rico.",
      Precio: 0,
      Favorito: true,
      esPar: true
    },
    {
      Imagen: "https://i2.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/06/tapa_bebidas.png?fit=700%2C336&ssl=1&resize=1280%2C720",
      Titulo: "Limonada",
      Descripcion: "",
      Precio: 2.5,
      Favorito: false,
      esPar: false
    }
  ]
  ngOnInit() {
  }

}
