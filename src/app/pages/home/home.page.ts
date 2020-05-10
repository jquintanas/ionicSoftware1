import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  //variables de control
  banderaDeBusqueda: boolean = false;
  productoBusqueda: string = "";
  constructor(private router : Router) { }

  ngOnInit() {
  }

  habilitarBusqueda() {
    this.banderaDeBusqueda = !this.banderaDeBusqueda;
    this.productoBusqueda = "";
  }

  buscarProducto(){
    console.log("buscando....")
  }

  abrirCarrito() {
    this.router.navigateByUrl("carrito-compras");
  }

  

}
