import { DetalleProducto } from "./productoDetalle";
/**
 *
 * @desc product detail interface
 * @export
 * @interface ProductoCarrito
 */
export interface ProductoCarrito {
    id: string;
    cantidad: number;
    producto: DetalleProducto;
}
