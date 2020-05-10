import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postres',
  templateUrl: './postres.page.html',
  styleUrls: ['./postres.page.scss'],
})
export class PostresPage implements OnInit {

  dataPostres = [
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
