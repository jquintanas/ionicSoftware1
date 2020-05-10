import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.page.html',
  styleUrls: ['./promociones.page.scss'],
})
export class PromocionesPage implements OnInit {
  dataPromociones = [
    {
      Imagen: "",
      Titulo: "",
      Descripcion: "",
      Precio: 0,
      Favorito: false,
      esPar: false
    },
    {
      Imagen: "",
      Titulo: "",
      Descripcion: "",
      Precio: 0,
      Favorito: true,
      esPar: true
    },
    {
      Imagen: "",
      Titulo: "",
      Descripcion: "",
      Precio: 0,
      Favorito: false,
      esPar: false
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
