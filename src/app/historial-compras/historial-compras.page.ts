import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.page.html',
  styleUrls: ['./historial-compras.page.scss'],
})
export class HistorialComprasPage implements OnInit {

  private historial = [
  {
    id:'1',
    title: 'PEDIDO #1334',
    imagenURL: 'https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/location-alt-512.png',
    fecha: '12/03/2020',
    descripcion: 'Retiro Domicilio',
    monto: '$5.50'
  },
  {
    id:'2',
    title: 'PEDIDO #1323',
    imagenURL: 'https://i.pinimg.com/originals/c8/a9/5c/c8a95c41af8a7b2538759f5b9ee063ee.png',
    fecha: '10/03/2020',
    descripcion: 'Retiro Domicilio',
    monto: '$15.50'
  }
]

  constructor() { }

  ngOnInit() {
  }

}
