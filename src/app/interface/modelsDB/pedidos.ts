export interface pedidos{
    idpedido?: Number;
    idcompra: Number;
    idproducto: Number;
    cantidad: Number;
    subtotal: Number;
    cubiertos: boolean;
    envio:number;
    total:number;
    createdAt?: Date;
    updatedAt?: Date;
}