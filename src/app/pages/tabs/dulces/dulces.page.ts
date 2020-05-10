import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dulces',
  templateUrl: './dulces.page.html',
  styleUrls: ['./dulces.page.scss'],
})
export class DulcesPage implements OnInit {
  dataDulces =[
    {
      Imagen: "https://i.ytimg.com/vi/AKC-mXZ2ZRQ/maxresdefault.jpg",
      Titulo: "Nutella",
      Descripcion: "Nutella con M&M",
      Precio: 5,
      Favorito: false,
      esPar: false
    },
    {
      Imagen: "https://www.65ymas.com/uploads/s1/12/15/48/europapress-1269237-dulce-dulces-pastel-pasteles-pastelitos-pastelito-comida-comidas-postre-postres-donut-donuts.jpeg",
      Titulo: "Donas",
      Descripcion: "Donas surtidas",
      Precio: 1.25,
      Favorito: true,
      esPar: true
    },
    {
      Imagen: "https://eldiariony.com/wp-content/uploads/sites/2/2017/05/gomitas.jpg?quality=60&strip=all&w=940",
      Titulo: "Gomitas",
      Descripcion: "Gomitas de sabores por libra",
      Precio: 2.5,
      Favorito: false,
      esPar: false
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
