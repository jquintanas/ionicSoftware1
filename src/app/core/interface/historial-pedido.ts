export interface PedidoHistorial {
    idpedido: number;
    idcompra: number;
    idproducto: string;
    cantidad: number;
    subtotal: number;
    cubiertos: boolean;
    estado: string;
    compra: any [];
}
