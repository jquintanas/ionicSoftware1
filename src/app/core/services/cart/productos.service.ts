import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Categorias } from "src/app/core/interface/modelNOSQL/categorias";
import { environment } from "src/environments/environment";
import { map } from 'rxjs/operators';
import { Productos } from "src/app/core/interface/modelNOSQL/productos";
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  public mapaCategorias: Map<string, Categorias>;
  private subjectCategorias = new BehaviorSubject(false);

  constructor(private db: AngularFirestore) {
    if (!this.mapaCategorias) {
      this.mapaCategorias = new Map();
    }
  }

  public obtenerCategorias() {
    return this.db.collection(environment.nombresTablasFirebase.categorias).snapshotChanges().pipe(map(categorias => {
      return categorias.map(c => {
        return c.payload.doc.data() as Categorias;
      });
    }));
  }

  public obtenerProductosPorCategoria(idCategoria: string) {
    // tslint:disable-next-line: max-line-length
    return this.db.collection(environment.nombresTablasFirebase.productos, ref => ref.where("idCategoria", "==", idCategoria)).snapshotChanges().pipe(map(producto => {
      return producto.map(p => {
        return p.payload.doc.data() as Productos;
      });
    }));
  }

  public notificarCambio() {
    this.subjectCategorias.next(true);
  }

  public onservarCategorias() {
    return this.subjectCategorias.asObservable();
  }

}
