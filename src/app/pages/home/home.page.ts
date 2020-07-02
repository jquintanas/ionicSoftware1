import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BusquedaService } from "src/app/services/comunicacion/busqueda.service";
import { CarritoService } from 'src/app/services/cart/carrito.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  //variables de control
  banderaDeBusqueda: boolean = false;
  productoBusqueda: string = "";
  banderasTabs: boolean[] = [true, false, false, false, false];
  tabActual = 0;
  cantidadProductos: number = 0;
  private subscripcion:any;
  constructor(
    private router: Router, 
    private busqueda: BusquedaService,
    private carrito: CarritoService
    )
     { }
  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  ngOnInit() {
    this.subscripcion= this.carrito.observarCantidad().subscribe((data:number) => {
      this.cantidadProductos = data;
    });
  }

  habilitarBusqueda() {
    this.banderaDeBusqueda = !this.banderaDeBusqueda;
    if (!this.banderaDeBusqueda) {
      this.busqueda.generarBusqueda("all");
      this.productoBusqueda = "";
    }
  }

  buscarProducto() {
    this.busqueda.generarBusqueda(this.productoBusqueda);
  }

  abrirCarrito() {
    this.router.navigateByUrl("carrito-compras");
  }

  cambiarBanderaTabs(indice: number) {
    this.banderasTabs[this.tabActual] = false;
    this.tabActual = indice;
    this.banderasTabs[indice] = true;
    this.productoBusqueda = "";
    this.busqueda.cambioDeTag(indice);
    this.productoBusqueda = this.busqueda.obtenerProductoBuscar();
  }

 

  abrirPerfil(){
    this.router.navigateByUrl("perfil-usuario");
  }

  limpiarBusqueda(){
    this.busqueda.generarBusqueda("all");
  }


}
