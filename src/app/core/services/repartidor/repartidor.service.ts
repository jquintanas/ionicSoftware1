import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { environment } from "src/environments/environment";
import { Repartidor } from "src/app/core/interface/modelNOSQL/repartidor";
import { map } from 'rxjs/operators';
import { Pedidos } from 'src/app/core/interface/modelNOSQL/pedido';

@Injectable({
  providedIn: 'root'
})
/**
 * @classdesc Container class of Repartidor Service.
 * @desc Creation Date: 08/20/2020
 * @class
 * @public
 * @version 1.0.0
 * @author Francesca Man Ging <fman@espol.edu.ec>
 */
export class RepartidorService {

  constructor(
    private db: AngularFirestore
  ) {}

  public obtenerRepartidorPorIdPedido(idPedido: string) {
    return this.db.collection(environment.nombresTablasFirebase.repartidor, ref => ref.where("Pedido", "==", idPedido))
    .snapshotChanges().pipe(map(producto => {
      return producto.map(p => {
        return p.payload.doc.data() as Repartidor;
      });
    }));
  }

  public obtenerRepartidorPorID(cedula: string) {
    return this.db.collection(environment.nombresTablasFirebase.repartidor, ref => ref.where("cedula", "==", cedula))
    .snapshotChanges().pipe(map(producto => {
      return producto.map(p => {
        return p.payload.doc.data() as Repartidor;
      });
    }));
  }

  public obtenerEstadoPorIdPedido(idPedido: string) {
    return this.db.collection(environment.nombresTablasFirebase.pedidos, ref => ref.where("idPedido", "==", idPedido))
    .snapshotChanges().pipe(map(pedido => {
      return pedido.map(p => {
        console.log( p.payload.doc.data());
        return p.payload.doc.data() as Pedidos;
      });
    }));
  }

  public obtenerRepartidores() {
    return this.db.collection(environment.nombresTablasFirebase.repartidor).snapshotChanges().pipe(map(repartidores => {
      return repartidores.map(r => {
        return r.payload.doc.data() as Repartidor;
      });
    }));
  }


}
