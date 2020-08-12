import { DetalleProducto } from "./productoDetalle";
export interface ProductoCarrito {
    id: string;
    cantidad: number;
    producto: DetalleProducto;
}
