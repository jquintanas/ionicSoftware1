export interface Pedidos {
    idpedido?: number;
    idcompra: number;
    idproducto: number;
    cantidad: number;
    subtotal: number;
    cubiertos: boolean;
    envio: number;
    total: number;
    createdAt?: Date;
    updatedAt?: Date;
}