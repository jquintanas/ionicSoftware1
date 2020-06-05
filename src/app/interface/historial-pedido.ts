import { productoCarrito } from "./productoCarrito";

export interface detalleHistorial {
    idpedido: string;
    producto: productoCarrito;
    valor: number;
    metodoEnvio: boolean;
    fecha: Date;
}
