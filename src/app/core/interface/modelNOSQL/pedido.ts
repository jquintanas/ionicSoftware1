export interface Pedidos {
    cantidades: number[];
    cubiertos: boolean;
    direccionEntrega: string;
    estadoDelPedido: number;
    idPedido: string;
    idUsuario: string;
    isDomicilio: boolean;
    isEfectivo: boolean;
    productos: string [];
    total: number;
    totalProductos: number;
}
