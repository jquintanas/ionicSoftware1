import { Productos } from '../modelNOSQL/productos';

export interface Carrito {
    idCarrito: string;
    productos: Productos[];
    subtotal: number;
}