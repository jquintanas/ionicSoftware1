import { productos } from "./productos";
export interface promocion {
    idPromocion?: string;
    producto: productos;
    activo: boolean;
}