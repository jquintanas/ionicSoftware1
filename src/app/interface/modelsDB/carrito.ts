import { productos } from '../modelNOSQL/productos';


export interface carrito{
    idCarrito:string;
    productos: productos[];
    subtotal:number;
}