import { productoCarrito } from "./productoCarrito";

export interface detalleHistorial {
    idpedido: string;
    producto: string;
    cantidad: number;
    valor: number;
    metodoEnvio: boolean;
    fecha: string;
}
