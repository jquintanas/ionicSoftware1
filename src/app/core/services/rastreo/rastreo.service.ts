import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RastreoService {
  public valorTotal: number;
  public idPedido: string;
  public listaProductos: string [];
  public cantProductos: number [];
  public domicilio: boolean;
  public fecha: Date;
  public efectivo: boolean;
  public direccionEnvio: string;

  constructor() { }
}
