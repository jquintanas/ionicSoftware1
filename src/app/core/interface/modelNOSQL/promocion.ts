import { Productos } from "./productos";
export interface Promocion {
    idPromocion?: string;
    producto: Productos;
    activo: boolean;
}