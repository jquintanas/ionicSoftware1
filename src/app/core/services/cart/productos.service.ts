import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Categorias } from "src/app/core/interface/modelNOSQL/categorias";
import { environment } from "src/environments/environment";
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  public mapaCategorias: Map<string, Categorias>;

  constructor(private db: AngularFirestore) {
    if (this.mapaCategorias) {
      this.mapaCategorias = new Map();
    }
  }

  public obtenerCategorias() {
    return this.db.collection(environment.nombresTablasFirebase.categorias).snapshotChanges().pipe(map(categorias => {
      return categorias.map( c => {
        return c.payload.doc.data() as Categorias;
      });
    }));
  }


}
