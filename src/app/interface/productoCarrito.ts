import { detalleProducto } from "./productoDetalle";
export interface productoCarrito {
    id: string;
    cantidad: number;
    producto: detalleProducto;
}