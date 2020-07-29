import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BusquedaService } from "src/app/core/services/comunicacion/busqueda.service";
import { CarritoService } from 'src/app/core/services/cart/carrito.service';
import { ProductosService } from 'src/app/core/services/cart/productos.service';
import { ToastController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  // variables de control
  banderaDeBusqueda: boolean = false;
  productoBusqueda: string = "";
  banderasTabs: boolean[] = [true, false, false, false, false];
  tabActual = 0;
  cantidadProductos: number = 0;
  private subscripcion: any;
  private subCategorias: any;
  constructor(
    private router: Router,
    private busqueda: BusquedaService,
    private carrito: CarritoService,
    private productosServices: ProductosService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }
  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
    this.subCategorias.unsubscribe();
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({message: "Cargando..."});
    await loading.present();
    this.subscripcion = this.carrito.observarCantidad().subscribe((data: number) => {
      this.cantidadProductos = data;
    });
    this.subCategorias = this.productosServices.obtenerCategorias().subscribe(
      (data) => {
        for (const dt of data) {
          this.productosServices.mapaCategorias.set(dt.nombre, dt);
        }
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
        this.generarToast("Algo salio mal al cargas los datos de las categorías.");
      }
    );
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



  abrirPerfil() {
    this.router.navigateByUrl("perfil-usuario");
  }

  limpiarBusqueda() {
    this.busqueda.generarBusqueda("all");
  }

  private async generarToast(mensaje: string) {
    const toast = await this.toastController.create({ message: mensaje, duration: 2000 });
    await toast.present();
  }

}
