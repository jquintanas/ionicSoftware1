import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tortas',
  templateUrl: './tortas.page.html',
  styleUrls: ['./tortas.page.scss'],
})
export class TortasPage implements OnInit {
  dataTorta = [
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
